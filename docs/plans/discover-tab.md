# 발견 탭 개발 계획서

다른 사용자가 공유한 책 문장을 피드 형태로 탐색하는 **발견(Discover) 탭** 구현 계획서

---

## 1. Feature 명칭 결정

### 후보군

| 이름 | 뉘앙스 |
|------|--------|
| `discover` | 동사형, 직관적. Instagram Explore, TikTok Discover 등에서 사용 |
| `explore` | 탐색/둘러보기 느낌이 더 강함 |
| `feed` | 피드 자체를 가리키지만, Figma 내 하위 화면 이름으로 이미 사용 중 |
| `discovery` | 명사형. FSD 슬라이스 네이밍으로는 다소 길어 가독성 저하 |

### 결정: `discover`

- 짧고 동사형이라 `features/discover-filter/`, `widgets/discover-feed/` 등 FSD 슬라이스 네이밍과 자연스럽게 어울림
- `feed`는 Figma 설계에서 이미 발견 탭 내부의 하위 화면 이름으로 사용되고 있어 혼동 우려
- `explore`보다 "발견"의 뉘앙스(새로운 문장을 만나는 경험)를 더 직접적으로 표현

---

## 2. Figma 디자인 분석

Figma 노드 `2339:7850` (섹션명: `2.발견`) 기준으로 확인한 화면 구성:

### 피드 화면 (메인 뷰)

| 영역 | 구성 |
|------|------|
| 헤더 | 검색바 ("문장을 검색해세요") + 돋보기 아이콘 |
| 필터 탭 | 전체, 한국소설, 일본소설, 영미소설, 판타지, 고전문학, 인문, 철학, 에세이･시, 영화･드라마 원작 |
| 리스트 아이템 | 아바타 + 닉네임 + 경과 시간 / 책 인용 문장 / 책 제목·저자 / 감정 태그 2개 / 북마크 아이콘 |
| GNB | 홈, 피드(활성), 캘린더 |

### 상세 카드 모달

리스트 아이템 탭 시 피드 위에 dim 처리 + 카드가 올라오는 구조:

- **카드 상단** (`key-secondary2` 배경): 날짜 `26, Monday` (`point1` 폰트)
- **카드 본문** (흰 배경): 인용 문장 (큰 타이포그래피)
- **카드 하단** (`key-secondary-0` 배경): 책 제목 + 저자
- **카드 하단부** (카드 외부 아래): 감정 태그 `# 아주 기분 좋아요` `# 관점을 전환하는 문장`
- **액션바** (다크 배경): 공유 아이콘 | 구분선 | 북마크 아이콘 (토글)

**카드 타입 2가지**: `text`(인용문) / `image`(책 표지 이미지)

---

## 3. FSD 아키텍처 설계

### 전체 구조

```
app/
└── (nav)/discover/
    └── page.tsx  ← searchParams.search 유무에 따라 두 위젯 중 하나를 렌더링

entities/
└── post/
    ├── model/post.types.ts
    ├── api/postApi.ts
    ├── api/postQueries.ts
    ├── ui/PostListItem.tsx
    ├── ui/PostShareCard.tsx
    └── index.ts

features/
├── discover-filter/
│   ├── model/useDiscoverFilter.ts
│   ├── ui/GenreFilterChips.tsx     ← 피드 전용 (가로 스크롤 칩)
│   ├── ui/GenreFilterDropdown.tsx  ← 검색결과 전용 (드롭다운 버튼)
│   └── index.ts
├── discover-search/
│   ├── model/useDiscoverSearch.ts
│   ├── ui/DiscoverSearchBar.tsx    ← 피드·검색결과 공용
│   └── index.ts
└── post-bookmark/
    ├── api/toggleBookmark.ts
    ├── ui/BookmarkButton.tsx
    └── index.ts

widgets/
├── discover-feed/
│   ├── ui/DiscoverFeed.tsx           ← 기본 피드 (가로 스크롤 칩 필터)
│   └── index.ts
├── discover-search-results/
│   ├── ui/DiscoverSearchResults.tsx  ← 검색 결과 (드롭다운 필터)
│   └── index.ts
└── post-share-modal/
    ├── ui/PostShareModal.tsx
    └── index.ts
```

### 설계 근거

#### `entities/post/` 신규 생성

기존 `entities/diary/`는 **내 일기** 도메인이다. 발견 피드에 표시되는 항목은 타인의 공개 포스트이므로 별도 엔티티로 분리한다.

- `PostListItem` — 피드 목록에서 재사용되는 아이템 UI
- `PostShareCard` — 모달에서 사용되는 상세 카드 (`text` / `image` variant)
- `postQueries` — 피드 목록 및 단건 조회 TanStack Query 훅

#### `features/discover-filter/`

장르 필터의 선택 상태(`useDiscoverFilter`)와 두 가지 UI를 함께 캡슐화한다.
- `GenreFilterChips` — 피드 화면의 가로 스크롤 칩 UI
- `GenreFilterDropdown` — 검색결과 화면의 드롭다운 버튼 UI

동일한 `GenreFilter` 타입과 `GENRE_FILTERS` 상수를 공유하되, UI는 컨텍스트에 맞게 교체한다.

#### `features/discover-search/`

`DiscoverSearchBar` UI와 검색 상태를 담는다. 피드·검색결과 양쪽에서 재사용되는 공용 컴포넌트다. 검색 confirm 시 `/discover?search=키워드` 로 라우팅하는 책임도 이 슬라이스가 가진다.

#### `features/post-bookmark/`

북마크 토글은 API 뮤테이션 + UI 상태 반영이 필요한 사용자 행동이므로 feature 레이어가 적절하다. `PostListItem`(entities)과 `PostShareModal`(widgets) 양쪽에서 재사용된다.

#### `widgets/discover-feed/`

기본 피드 화면. `DiscoverSearchBar` + `GenreFilterChips` + `PostListItem` 목록을 조합한다.

#### `widgets/discover-search-results/`

검색 결과 화면. `DiscoverSearchBar`(현재 키워드 표시) + `GenreFilterDropdown` + `PostListItem` 목록을 조합한다. URL의 `search` 파라미터를 query로 받아 사용한다.

두 화면은 헤더 UI(칩 vs 드롭다운)와 상태 출처(컴포넌트 state vs URL params)가 달라 위젯을 분리하는 것이 적합하다. 단일 위젯에서 조건 분기하면 향후 각 모드에 기능이 추가될수록 복잡도가 급증한다.

#### `widgets/post-share-modal/`

dim 오버레이 + `PostShareCard`(entity) + 감정/톤 태그 + 작성자 프로필 + `ShareScrap` 액션바를 조합한다. 여러 하위 레이어를 조합하는 블록이므로 widget 레이어가 적합하다.

#### `app/(nav)/discover/page.tsx`

GNB가 포함된 기존 `(nav)` 라우트 그룹 하위에 배치해 캘린더 탭과 동일한 레이아웃을 공유한다. `searchParams.search` 유무에 따라 `DiscoverFeed` 또는 `DiscoverSearchResults`를 렌더링한다.

---

## 4. 구현 계획

### Step 1. 구조 설계

FSD 아키텍처에 맞게 슬라이스 스켈레톤 파일을 생성한다.

**작업 목록**
- [X] `entities/post/` 슬라이스 생성 (types, api, ui, index)
- [X] `features/discover-filter/` 슬라이스 생성
- [X] `features/discover-search/` 슬라이스 생성
- [X] `features/post-bookmark/` 슬라이스 생성
- [X] `widgets/discover-feed/` 슬라이스 생성
- [X] `widgets/post-share-modal/` 슬라이스 생성
- [X] `app/(nav)/discover/page.tsx` 생성

---

### Step 2. 발견탭 전용 컴포넌트 구현

피드와 모달에서 공통으로 사용되는 엔티티 UI 컴포넌트를 구현한다.

#### 참고 Figma 노드

| 컴포넌트 | Figma 노드 | 비고 |
|----------|-----------|------|
| 태그 (`PostTag`) | `2658:3853` | `entities/post/ui/` 에 추가 |
| 북마크 버튼 (`BookmarkButton`) | `2659:3980` | `features/post-bookmark/ui/` |
| 리스트 아이템 (`PostListItem`) | `2659:4192` | 프로필 영역(아바타+닉네임)은 별도 컴포넌트로 분리 |

#### 구현 시 참고 사항

- 목업 데이터는 `entities/post/model/mock.ts` 에 작성하고 스켈레톤 대신 사용
- `IcBookmark` 아이콘이 없으므로 신규 추가 필요 (`shared/ui/icons/`)

**작업 목록**
- [x] `IcBookmark` 아이콘 컴포넌트 추가
- [x] `PostTag.tsx` 구현
- [x] `PostAuthorProfile.tsx` 구현 (아바타 + 닉네임 + 경과 시간)
- [x] `BookmarkButton.tsx` 구현
- [x] `PostListItem.tsx` 구현
- [x] `mock.ts` 목업 데이터 작성

---

### Step 3. 피드 UI 개발

피드 화면 전체를 조합하는 `DiscoverFeed` widget과 페이지를 완성한다.

#### 참고 Figma 노드

| 컴포넌트 | Figma 노드 | 위치 |
|----------|-----------|------|
| `DiscoverSearchBar` | `2659:4200` | `features/discover-search/ui/` |
| `DiscoverFeed` | `2657:3771` | `widgets/discover-feed/ui/` |
| `GenreFilterChips` | `2657:3771` | `features/discover-filter/ui/` |

#### 구현 시 참고 사항

- 이 단계에서는 `usePostsQuery` 대신 `MOCK_POSTS` 를 사용해 개발
- `GenreFilterChips` 는 가로 스크롤 처리 필요 (항목이 화면 너비를 초과함)

**작업 목록**
- [x] `DiscoverSearchBar.tsx` UI 마크업
- [x] `GenreFilterChips.tsx` UI 마크업 (선택된 칩 활성 스타일 + 가로 스크롤)
- [x] `DiscoverFeed.tsx` 에 `DiscoverSearchBar` + `GenreFilterChips` + `PostListItem` 리스트 조합
- [x] `MOCK_POSTS` 로 피드 목록 렌더링
- [x] 아이템 탭 시 `PostShareModal` 열기 상태 관리
- [x] 스크롤 시 헤더(검색바 + 필터)는 고정, 리스트만 스크롤되는 레이아웃 처리
- [x] `PostShareModal` 을 `DiscoverFeed` 에 마운트

---

### Step 4. 검색 기능 개발

검색어 기반 피드 조회 및 최근 검색어 관리 기능을 구현한다.

#### 검색 플로우

1. `/discover` → `DiscoverFeed` 렌더링. 검색어 입력 후 검색 버튼(또는 Enter) → `/discover?search=검색어` 로 이동
2. `/discover?search=검색어` → `DiscoverSearchResults` 렌더링. 헤더에 현재 검색어 표시 + 결과 목록
3. `DiscoverSearchResults` 에서 검색어 변경 후 Enter → `/discover?search=변경한 검색어` 로 이동 (`router.push`)
4. `DiscoverSearchResults` 에서 검색어를 비운 채 Enter → 최근 검색어 목록 표시
5. `DiscoverSearchResults` 에서 `<` 버튼 클릭 → `/discover` 로 이동

#### 참고 Figma 노드

| 화면 | Figma 노드 | 비고 |
|------|-----------|------|
| 빈 검색어 (최근 검색) | `2657:3082` | 헤더 + 최근 검색어 리스트 |
| 검색 결과 | `2657:3155` | 헤더 + 드롭다운 필터 + 결과 목록 |

#### 추가 컴포넌트 및 모델

```
features/discover-search/
├── model/useDiscoverSearch.ts   ← 검색어 로컬 state, confirm 시 router.push
├── model/useSearchHistory.ts    ← 최근 검색어 관리 (localStorage)
├── ui/DiscoverSearchBar.tsx     ← (기존) 공용 검색바
└── ui/SearchHistoryList.tsx     ← 최근 검색어 목록 (항목 클릭 → 검색, X 버튼 → 삭제)

widgets/discover-search-results/
└── ui/DiscoverSearchResults.tsx ← 검색 결과 위젯 (헤더 + 검색바 + 필터 + 결과)
```

#### 구현 시 참고 사항

- 검색어 입력 중 URL 변경 없음 — 로컬 state로 관리, confirm 시에만 `router.push`
- 최근 검색어는 `localStorage` 에 저장 (최대 5개 유지)
- 빈 검색어 상태 헤더: `bg-key-point-50`, `<` 버튼(28×28) + 중앙 placeholder(`subhead2 text-gray-400`)
- 최근 검색어 아이템: `body1 text-gray-600`, 우측 X 버튼(30×30), 아이템 간 `gap-[18px]`

**작업 목록**
- [ ] `useSearchHistory.ts` 구현 (add / remove / clear, localStorage 연동)
- [ ] `useDiscoverSearch.ts` 구현 (로컬 state + confirm 시 `router.push` + 최근 검색어 저장)
- [ ] `SearchHistoryList.tsx` UI 마크업 (node `2657:3082`)
- [ ] `DiscoverSearchResults.tsx` 위젯 구현 (헤더 + 결과 목록, node `2657:3155`)
- [ ] `app/(nav)/discover/page.tsx` 에서 `searchParams.search` 유무로 위젯 분기
- [ ] `DiscoverFeed` 의 `DiscoverSearchBar` 에 confirm 시 라우팅 연결

---

### Step 5. 공유 모달 개발

포스트 탭 시 열리는 상세 공유 모달(`PostShareModal`)과 하단 액션바(`ShareScrap`)를 구현한다.

#### 참고 Figma 노드

| 컴포넌트 | Figma 노드 | 비고 |
|----------|-----------|------|
| `PostShareModal` | `2697:5403` | dim 오버레이 + 카드 + 태그 + 작성자 프로필 + 액션바 전체 |
| `ShareScrap` | `2804:7369` | 공유 아이콘(34px) + 구분선(24px) + 북마크 토글(34px), 2가지 variant |

#### 컴포넌트 구조

```
widgets/post-share-modal/
├── ui/PostShareModal.tsx   ← dim 오버레이 + PostShareCard + 태그칩 + 작성자 + ShareScrap
└── index.ts

features/post-share/
├── ui/ShareScrap.tsx       ← 공유 아이콘 + 구분선 + 북마크 토글
└── index.ts
```

#### 디자인 메모

- 오버레이: `bg-[rgba(9,9,9,0.94)]` (매우 어두운 dim, 발견 탭 전용)
- 태그 칩: `bg-gray-600` 배경, 흰 텍스트, `flex-wrap` + `gap-[24px_8px]`, 가운데 정렬
- 작성자 프로필: 카드 위에 배치, `caption1 text-[#f7f7f7]`
- `ShareScrap`: 화면 하단 중앙 고정, `flex gap-[12px] items-center`

**작업 목록**
- [ ] `features/post-share/` 슬라이스 생성
- [ ] `IcShare` 아이콘 컴포넌트 추가 (`shared/ui/icons/`)
- [ ] `ShareScrap.tsx` UI 구현 (node `2804:7369`) — `isBookmarked` / `onShare` / `onToggleBookmark` props
- [ ] `PostShareModal.tsx` 위젯 구현 (node `2697:5403`)
- [ ] `DiscoverFeed` 및 `DiscoverSearchResults` 에서 `PostDetailModal` → `PostShareModal` 교체
- [ ] Web Share API (`navigator.share`) 연동 + 미지원 환경 URL 복사 폴백

---

### Step 6. 필터 기능 개발

장르 필터 칩을 선택해 피드를 필터링한다.

**작업 목록**
- [ ] `useDiscoverFilter` 선택값을 `usePostsQuery` 에 전달해 필터링 연결
- [ ] `전체` 선택 시 필터 파라미터 미전달 처리
