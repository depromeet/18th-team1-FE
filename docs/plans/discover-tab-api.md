# 발견 탭 API 연결 계획서

발견 탭의 API(피드 목록 조회, 검색, 스크랩 토글)를 실제 서버에 연결하고 커서 기반 무한 스크롤을 구현하는 작업 계획서.

---

## 1. API 명세 요약

### 1-1. 피드 목록 조회

```
GET /api/discovery/quotes
```

| 파라미터 | 필수 | 설명 |
|---------|------|------|
| `cursor` | N | 이전 응답의 `nextCursor` 값 (첫 페이지는 생략) |
| `genre` | N | 장르 필터 (생략하거나 `전체`이면 전체 조회) |

응답: `{ quotes, nextCursor, hasNext }`

### 1-2. 검색

```
GET /api/discovery/quotes/search
```

| 파라미터 | 필수 | 설명 |
|---------|------|------|
| `query` | Y | 검색어 |
| `sort` | N | `latest` \| `scrap` (기본: `latest`) |
| `cursor` | N | 이전 응답의 `nextCursor` 값 |
| `genre` | N | 장르 필터 |

### 1-3. 문장 스크랩

```
PUT /api/quotes/{quoteId}/scrap
```

- 응답: `204 No Content` (본문 없음)
- 이미 스크랩된 문장에 요청 시 서버 정책에 따름 (멱등 처리 가정)

### 1-4. 문장 스크랩 취소

```
DELETE /api/quotes/{quoteId}/scrap
```

- 응답: `204 No Content` (본문 없음)

---

## 2. 타입 불일치 분석

현재 `entities/post`의 `Post` 타입은 목업 기준으로 정의되어 있어 API 응답과 차이가 있다.

| 항목 | 현재 `Post` 목업 타입 | 피드 API (1번) | 검색 API (2번) |
|------|-----------------------|----------------|----------------|
| 문장 ID | `id: string` | `quoteId: number` | `quoteId: number` |
| 작성자 | `author: { id, nickname, avatarUrl }` | `recommendedUserId`, `recommendedUserNickname` | `recommendedUserId`, `recommendedUserNickname` |
| 감정 태그 | `emotionTag: string`, `toneTag: string` | `needTag: { id, label } \| null` (단일) | `needTag: { id, label } \| null` (단일) |
| 기분 | `mood: PostMood` | `emotionValue: number`, `emotionLabel: string` (플랫) | `emotion: { value, label }` (중첩) |
| 책 정보 | `book: { title, author, coverImageUrl? }` | `title`, `author`, `bookCoverImageUrl` | `title`, `author`, `bookCoverImageUrl` |
| 장르 | 없음 | `genre: string` | `genre: string` |
| 북마크 여부 | `isBookmarked: boolean` | `isScrapped: boolean` | `isScrapped: boolean` |
| 날짜 | `createdAt: string`, `date: string` | `recommendedAt: string` (ISO 8601) | `recommendedAt: string` (ISO 8601) |

> **⚠️ 두 API 간 스키마 불일치**: 감정(기분) 데이터가 피드 API는 `emotionValue`/`emotionLabel` 플랫 구조, 검색 API는 `emotion: { value, label }` 중첩 구조로 다르다. 각각 별도 DTO로 정의한 뒤, 위젯에서 통일된 `DiscoveryEmotion` 형태로 정규화해서 사용한다.

### 처리 방침

1. **DTO 타입 신규 정의**: API별로 1:1 매핑되는 `DiscoveryQuoteDto`(피드), `DiscoveryQuoteSearchDto`(검색) 두 타입을 `entities/post/model/post.types.ts`에 추가한다.
2. **`Post` 타입은 유지**: 기존 `Post` 타입과 목업 코드는 공유 모달(`PostShareModal`) 등 아직 API 연결이 완료되지 않은 다른 영역에서 사용 중이므로 섣불리 제거하지 않는다.
3. **`recommendedUserNickname`**: 닉네임이 API에 포함되어 `PostAuthorProfile`의 `nickname`에 직접 사용한다. 아바타 이미지는 API에 없으므로 기본 아바타(또는 닉네임 이니셜)로 표시한다.
4. **감정 정규화**: 피드/검색 DTO의 감정 필드가 다르므로, 위젯 렌더링 시 `{ value: number, label: string }` 형태의 `DiscoveryEmotion`으로 통일한다. 피드는 `{ value: emotionValue, label: emotionLabel }`, 검색은 `emotion` 그대로 사용.
5. **`needTag`**: `PostTag` 컴포넌트 1개로 표시한다. `null`이면 렌더링 생략한다.
6. **`isScrapped`**: 기존 UI의 `isBookmarked` prop에 그대로 전달한다 (의미 동일).
7. **`recommendedAt`**: `shared/lib`의 날짜 포맷 유틸을 활용해 상대 시간 문자열로 변환한다.

---

## 3. FSD 파일 배치

```
entities/post/
├── model/
│   └── post.types.ts          ← DiscoveryQuoteDto, DiscoveryQuoteListResponse 타입 추가
├── api/
│   ├── postApi.ts             ← fetchDiscoveryQuotes, fetchDiscoveryQuotesSearch 추가
│   └── postQueries.ts         ← useDiscoveryFeedQuery, useDiscoverySearchQuery 추가 (useInfiniteQuery)
└── index.ts                   ← 신규 타입·훅 barrel export 추가

shared/hooks/
└── useInfiniteScroll.ts       ← IntersectionObserver 기반 무한 스크롤 훅 (신규)

features/post-bookmark/
├── api/
│   └── scrapApi.ts            ← scrapQuote, unscrapQuote 함수 추가 (신규)
└── model/
    └── useScrapMutation.ts    ← useScrapMutation 훅 추가 (신규)

widgets/discover-feed/
└── ui/DiscoverFeed.tsx        ← MOCK_POSTS → useDiscoveryFeedQuery 교체

widgets/discover-search-results/
└── ui/DiscoverSearchResults.tsx ← MOCK_POSTS → useDiscoverySearchQuery 교체
```

---

## 4. 타입 정의

`entities/post/model/post.types.ts`에 아래 타입을 추가한다.

```ts
export interface DiscoveryNeedTag {
  id: number;
  label: string;
}

export interface DiscoveryEmotion {
  value: number;
  label: string;
}

/** 피드 목록 조회 API (GET /discovery/quotes) 응답 아이템 */
export interface DiscoveryQuoteDto {
  quoteId: number;
  bookId: number;
  recommendedUserId: number;
  recommendedUserNickname: string;
  content: string;
  title: string;
  author: string;
  bookCoverImageUrl: string;
  genre: string;
  needTag: DiscoveryNeedTag | null;
  emotionValue: number;   // 플랫 구조 (검색 API의 emotion.value와 동일 의미)
  emotionLabel: string;   // 플랫 구조 (검색 API의 emotion.label과 동일 의미)
  recommendedAt: string;
  isScrapped: boolean;
}

/** 검색 API (GET /discovery/quotes/search) 응답 아이템 */
export interface DiscoveryQuoteSearchDto {
  quoteId: number;
  bookId: number;
  recommendedUserId: number;
  recommendedUserNickname: string;
  content: string;
  title: string;
  author: string;
  bookCoverImageUrl: string;
  genre: string;
  needTag: DiscoveryNeedTag | null;
  emotion: DiscoveryEmotion; // 중첩 구조 (피드 API의 emotionValue/emotionLabel과 동일 의미)
  recommendedAt: string;
  isScrapped: boolean;
}

export interface DiscoveryQuoteListResponse {
  quotes: DiscoveryQuoteDto[];
  nextCursor: string | null;
  hasNext: boolean;
}

export interface DiscoveryQuoteSearchListResponse {
  quotes: DiscoveryQuoteSearchDto[];
  nextCursor: string | null;
  hasNext: boolean;
}
```

---

## 5. API 함수

`entities/post/api/postApi.ts`에 아래 두 함수를 추가한다.

```ts
export interface FetchDiscoveryQuotesParams {
  cursor?: string;
  genre?: string;
}

export const fetchDiscoveryQuotes = (
  params: FetchDiscoveryQuotesParams,
): Promise<DiscoveryQuoteListResponse> => {
  const searchParams = new URLSearchParams();
  if (params.cursor) searchParams.set("cursor", params.cursor);
  if (params.genre && params.genre !== "모든 장르") searchParams.set("genre", params.genre);
  const query = searchParams.toString();
  return httpClient.get<DiscoveryQuoteListResponse>(
    `/discovery/quotes${query ? `?${query}` : ""}`,
  );
};

export interface FetchDiscoveryQuotesSearchParams {
  query: string;
  sort?: "latest" | "scrap";
  cursor?: string;
  genre?: string;
}

export const fetchDiscoveryQuotesSearch = (
  params: FetchDiscoveryQuotesSearchParams,
): Promise<DiscoveryQuoteSearchListResponse> => {
  const searchParams = new URLSearchParams();
  searchParams.set("query", params.query);
  if (params.sort) searchParams.set("sort", params.sort);
  if (params.cursor) searchParams.set("cursor", params.cursor);
  if (params.genre && params.genre !== "모든 장르") searchParams.set("genre", params.genre);
  return httpClient.get<DiscoveryQuoteSearchListResponse>(
    `/discovery/quotes/search?${searchParams.toString()}`,
  );
};
```

---

## 5-2. 스크랩 API 함수

`features/post-bookmark/api/scrapApi.ts`를 신규 생성한다.

```ts
import { httpClient } from "@/shared/api/http-client";

export const scrapQuote = (quoteId: number): Promise<void> =>
  httpClient.put(`/quotes/${quoteId}/scrap`);

export const unscrapQuote = (quoteId: number): Promise<void> =>
  httpClient.delete(`/quotes/${quoteId}/scrap`);
```

> `httpClient`에 `put`, `delete` 메서드가 없으면 `http-client.ts`에 추가가 필요하다.

---

## 5-3. 스크랩 뮤테이션 훅

`features/post-bookmark/model/useScrapMutation.ts`를 신규 생성한다.

스크랩 토글은 피드·검색 두 쿼리의 캐시를 모두 낙관적으로 업데이트해야 한다.
실패 시 롤백하고, 완료(성공/실패 무관) 후 관련 쿼리를 무효화해 서버 상태와 동기화한다.

```ts
import { useQueryClient } from "@tanstack/react-query";
import { discoveryKeys } from "@/entities/post";
import { scrapQuote, unscrapQuote } from "../api/scrapApi";
import type { DiscoveryQuoteListResponse, DiscoveryQuoteSearchListResponse } from "@/entities/post";

type InfiniteDiscoveryData<T> = { pages: T[]; pageParams: unknown[] };

const patchIsScrapped = <T extends { quoteId: number; isScrapped: boolean }>(
  data: InfiniteDiscoveryData<{ quotes: T[]; nextCursor: string | null; hasNext: boolean }> | undefined,
  quoteId: number,
  isScrapped: boolean,
) => {
  if (!data) return data;
  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      quotes: page.quotes.map((q) => (q.quoteId === quoteId ? { ...q, isScrapped } : q)),
    })),
  };
};

export const useScrapMutation = () => {
  const queryClient = useQueryClient();

  const toggle = async (quoteId: number, currentIsScrapped: boolean) => {
    const nextIsScrapped = !currentIsScrapped;

    // 진행 중인 리페치 취소 (낙관적 업데이트가 덮어쓰이는 것 방지)
    await queryClient.cancelQueries({ queryKey: discoveryKeys.all });

    // 롤백용 스냅샷 저장
    const previousFeed = queryClient.getQueriesData<InfiniteDiscoveryData<DiscoveryQuoteListResponse>>({
      queryKey: discoveryKeys.feeds(),
    });
    const previousSearch = queryClient.getQueriesData<InfiniteDiscoveryData<DiscoveryQuoteSearchListResponse>>({
      queryKey: discoveryKeys.searches(),
    });

    // 낙관적 업데이트
    queryClient.setQueriesData<InfiniteDiscoveryData<DiscoveryQuoteListResponse>>(
      { queryKey: discoveryKeys.feeds() },
      (old) => patchIsScrapped(old, quoteId, nextIsScrapped),
    );
    queryClient.setQueriesData<InfiniteDiscoveryData<DiscoveryQuoteSearchListResponse>>(
      { queryKey: discoveryKeys.searches() },
      (old) => patchIsScrapped(old, quoteId, nextIsScrapped),
    );

    try {
      if (currentIsScrapped) {
        await unscrapQuote(quoteId);
      } else {
        await scrapQuote(quoteId);
      }
    } catch (error) {
      // 실패 시 롤백
      for (const [key, value] of previousFeed) {
        queryClient.setQueryData(key, value);
      }
      for (const [key, value] of previousSearch) {
        queryClient.setQueryData(key, value);
      }
      throw error;
    } finally {
      queryClient.invalidateQueries({ queryKey: discoveryKeys.all });
    }
  };

  return { toggle };
};
```

위젯에서의 사용 예:

```tsx
const { toggle } = useScrapMutation();

<BookmarkButton
  isBookmarked={quote.isScrapped}
  onToggle={() => toggle(quote.quoteId, quote.isScrapped)}
/>
```

---

## 6. TanStack Query 훅 (무한 스크롤)

`entities/post/api/postQueries.ts`에 추가한다. `useInfiniteQuery`를 사용해 커서 기반 페이지네이션을 구현한다.

```ts
export const discoveryKeys = {
  all: ["discovery"] as const,
  feeds: () => [...discoveryKeys.all, "feed"] as const,
  feed: (genre?: string) => [...discoveryKeys.feeds(), { genre }] as const,
  searches: () => [...discoveryKeys.all, "search"] as const,
  search: (query: string, sort: string, genre?: string) =>
    [...discoveryKeys.searches(), { query, sort, genre }] as const,
};

export const useDiscoveryFeedQuery = (genre?: string) =>
  useInfiniteQuery({
    queryKey: discoveryKeys.feed(genre),
    queryFn: ({ pageParam }) =>
      fetchDiscoveryQuotes({ cursor: pageParam as string | undefined, genre }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.hasNext ? lastPage.nextCursor ?? undefined : undefined,
    staleTime: 60 * 1000,
  });

export const useDiscoverySearchQuery = (
  query: string,
  sort: "latest" | "scrap" = "latest",
  genre?: string,
) =>
  useInfiniteQuery({
    queryKey: discoveryKeys.search(query, sort, genre),
    queryFn: ({ pageParam }) =>
      fetchDiscoveryQuotesSearch({
        query,
        sort,
        cursor: pageParam as string | undefined,
        genre,
      }),
    initialPageParam: undefined as string | undefined,
    // DiscoveryQuoteSearchListResponse 타입이므로 hasNext, nextCursor 동일하게 사용
    getNextPageParam: (lastPage) => lastPage.hasNext ? lastPage.nextCursor ?? undefined : undefined,
    enabled: query.length > 0,
    staleTime: 30 * 1000,
  });
```

---

## 7. 무한 스크롤 훅

`shared/hooks/useInfiniteScroll.ts`를 신규 생성한다. `IntersectionObserver`로 sentinel 엘리먼트가 뷰포트에 진입하면 `onIntersect` 콜백을 호출한다.

```ts
export const useInfiniteScroll = (
  onIntersect: () => void,
  options?: IntersectionObserverInit,
): React.RefObject<HTMLDivElement | null> => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) onIntersect();
    }, { threshold: 0.1, ...options });
    observer.observe(el);
    return () => observer.disconnect();
  }, [onIntersect, options]);

  return ref;
};
```

위젯에서의 사용 예:

```tsx
const { fetchNextPage, hasNextPage, isFetchingNextPage } = useDiscoveryFeedQuery(genre);
const sentinelRef = useInfiniteScroll(() => {
  if (hasNextPage && !isFetchingNextPage) fetchNextPage();
});

// 리스트 맨 아래에 sentinel 배치
<div ref={sentinelRef} className="h-1" />
```

---

## 8. 위젯 교체 내용

### DiscoverFeed

| 항목 | 변경 전 | 변경 후 |
|------|---------|---------|
| 데이터 소스 | `MOCK_POSTS` | `useDiscoveryFeedQuery(selectedGenre)` |
| 렌더링 | `Post[]` 순회 | `pages.flatMap(p => p.quotes)` 순회 |
| 스크롤 | 없음 | sentinel 기반 `fetchNextPage` 호출 |
| 장르 필터 | 로컬 상태만 | `queryKey`에 포함 → 필터 변경 시 재요청 |
| 로딩 상태 | 없음 | `isLoading` 시 스켈레톤 또는 스피너 표시 |

`PostListItem`에 전달하는 데이터 매핑:
- `content` → `PostListItem.Content`의 `content`
- `title`, `author` → `PostListItem.Content`의 `book`
- `recommendedUserNickname` → `PostAuthorProfile`의 `nickname`
- `needTag?.label` → `PostListItem.Tags`의 태그 (단일, `null`이면 생략)
- `emotionLabel` → `PostListItem.Tags`의 감정 태그 (`emotionValue`로 기분 아이콘/색상 결정)
- `isScrapped` → `BookmarkButton`의 `isBookmarked`
- `recommendedAt` → 상대 시간 변환 후 `PostAuthorProfile`의 `createdAt`

### DiscoverSearchResults

| 항목 | 변경 전 | 변경 후 |
|------|---------|---------|
| 데이터 소스 | `MOCK_POSTS` | `useDiscoverySearchQuery(initialQuery, sort, selectedGenre)` |
| 정렬 | 로컬 상태만 | `queryKey`에 포함 → 정렬 변경 시 재요청 |
| 스크롤 | 없음 | sentinel 기반 `fetchNextPage` 호출 |
| 빈 결과 | 없음 | `quotes.length === 0` 시 "검색 결과가 없습니다" 표시 |

---

## 9. 구현 작업 목록

### Step 1 — 타입 및 API 레이어

- [ ] `DiscoveryNeedTag`, `DiscoveryEmotion`, `DiscoveryQuoteDto`, `DiscoveryQuoteSearchDto`, `DiscoveryQuoteListResponse`, `DiscoveryQuoteSearchListResponse` 타입 추가 (`entities/post/model/post.types.ts`)
- [ ] `fetchDiscoveryQuotes`, `fetchDiscoveryQuotesSearch` 함수 추가 (`entities/post/api/postApi.ts`)
- [ ] `discoveryKeys`, `useDiscoveryFeedQuery`, `useDiscoverySearchQuery` 추가 (`entities/post/api/postQueries.ts`)
- [ ] `entities/post/index.ts` barrel export 업데이트
- [ ] `httpClient`에 `put`, `delete` 메서드 추가 (`shared/api/http-client.ts`)
- [ ] `scrapApi.ts` 신규 생성 (`features/post-bookmark/api/`)
- [ ] `useScrapMutation.ts` 신규 생성 (`features/post-bookmark/model/`)
- [ ] `features/post-bookmark/index.ts` barrel export 업데이트

### Step 2 — 무한 스크롤 훅

- [ ] `useInfiniteScroll.ts` 신규 생성 (`shared/hooks/`)
- [ ] `shared/hooks/index.ts` (또는 직접 import) export 등록

### Step 3 — DiscoverFeed 연결

- [ ] `useDiscoveryFeedQuery`로 데이터 교체
- [ ] `pages.flatMap`으로 quote 목록 평탄화
- [ ] `DiscoveryQuoteDto` → `PostListItem` props 매핑 처리
- [ ] sentinel + `useInfiniteScroll` 적용
- [ ] `useScrapMutation` 연결 (`BookmarkButton.onToggle`)
- [ ] 로딩/에러 상태 UI 추가
- [ ] `MOCK_POSTS` import 제거

### Step 4 — DiscoverSearchResults 연결

- [ ] `useDiscoverySearchQuery`로 데이터 교체
- [ ] 정렬(`sort`) 상태를 query key에 연결
- [ ] 장르 필터를 query key에 연결
- [ ] sentinel + `useInfiniteScroll` 적용
- [ ] `useScrapMutation` 연결 (`BookmarkButton.onToggle`)
- [ ] 빈 결과 상태 UI 추가
- [ ] `MOCK_POSTS` import 제거

---

## 10. 고려사항 및 결정이 필요한 사항

### 두 API 간 감정 스키마 불일치

피드 API는 `emotionValue`/`emotionLabel` 플랫 구조, 검색 API는 `emotion: { value, label }` 중첩 구조다. 서버 스펙이 변경되어 통일되면 DTO를 하나로 합칠 수 있다. 현재는 두 DTO를 분리 유지하고 위젯에서 `DiscoveryEmotion`으로 정규화한다.

### 아바타 이미지 없음

두 API 모두 `recommendedUserNickname`은 제공하지만 아바타 이미지 URL은 없다. `PostAuthorProfile`에서 아바타 미지원 시 기본 이미지(또는 닉네임 이니셜 처리)를 사용한다.

### `httpClient` 메서드 추가 필요

현재 `httpClient`에는 `get`, `post`, `getBlob`만 있다. 스크랩 API가 `PUT`/`DELETE`를 사용하므로 `http-client.ts`에 두 메서드를 추가해야 한다.

```ts
put: <T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> =>
  request<T>(path, { ...options, method: "PUT", body }),

delete: <T>(path: string, options?: RequestOptions): Promise<T> =>
  request<T>(path, { ...options, method: "DELETE" }),
```

### 낙관적 업데이트 범위

`useScrapMutation`은 `discoveryKeys.feeds()`와 `discoveryKeys.searches()` 두 범위를 동시에 업데이트한다. 피드와 검색 결과에서 같은 문장이 각각 표시될 수 있으므로 양쪽 캐시를 모두 패치해야 UI가 일관된다.

### `useDiscoverFilter`의 상태 범위

현재 `useDiscoverFilter`는 `DiscoverFeed`와 `DiscoverSearchResults`에서 각각 독립적으로 인스턴스화된다. 페이지 이동 시 필터가 초기화되는 것이 자연스러운 UX이므로 현재 구조를 유지한다.
