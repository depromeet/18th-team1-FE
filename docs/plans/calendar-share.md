# 캘린더 공유 기능 개발 계획서

캘린더 페이지에서 오늘의 문장 또는 캘린더 이미지를 생성해 SNS/이미지 공유하는 기능 구현 계획서.

---

## 1. 기능 개요 및 Figma IA

Figma 노드 `2780:10207` (섹션명: `3. 캘린더-공유`) 기준.

### 유저 플로우

모든 UI는 `/calendar` 위에 drawer/sheet 오버레이로 동작한다. 별도 라우트 없음.

```
캘린더 메인 (/calendar)
  └─ 공유 버튼(원형) 탭
       └─ [1] CalendarShareTypeSheet — 3가지 선택
            │
            ├─ 오늘의 문장
            │    └─ [2] SentenceShareCardDrawer — 문장 카드 3종 가로 스크롤 선택 → 공유
            │
            ├─ 캘린더
            │    └─ [2] CalendarShareCardDrawer — 캘린더 카드 2종 가로 스크롤 선택 → 공유
            │
            └─ 문장 선택
                 └─ [2] CalendarShareDateDrawer — 날짜 선택
                          └─ [3] SentenceShareCardDrawer — 문장 카드 3종 가로 스크롤 선택 → 공유
```

`SentenceShareCardDrawer`는 `SentenceTodayView`의 공유 버튼에서도 재사용 예정.

### 공유 포맷

| 선택 경로 | Drawer | 카드 수 |
|-----------|--------|--------|
| 오늘의 문장 | SentenceShareCardDrawer | 3종 |
| 캘린더 | CalendarShareCardDrawer | 2종 |
| 문장 선택 (날짜 지정) | SentenceShareCardDrawer | 3종 |

공유 이미지는 서버에서 생성해 Blob으로 내려주는 방식 (1080×1920px export 기준).

---

## 2. 공유 카드 상세 (Figma shareview 기준)

### 문장 카드 3종

| 카드 | Figma ID | 구성 |
|------|----------|------|
| 카드 1 | `shareview_1` | 월 이름 (GT Pressura) + Today's Text 레이블 + 문장 카드 |
| 카드 2 | `shareview_2` | 날짜 헤더 (`November 26`) + 문장 본문 + 책 제목 하단 바 |
| 카드 3 | `shareview_3` | (Figma 확인 필요 — 디자인 확정 후 반영) |

### 캘린더 카드 2종

| 카드 | Figma ID | 구성 |
|------|----------|------|
| 카드 4 | `shareview_4` | 월 이름 (상단) + 캘린더 그리드 전체 |
| 카드 5 | `shareview_5` | 날짜 헤더 + 캘린더 그리드 + 하단 구분선 |

---

## 3. 라우팅 구조

```
/calendar    ← 진입점. 모든 공유 UI가 이 페이지 위 overlay로 동작
```

별도 `/calendar/share` 라우트 없음.

---

## 4. FSD 아키텍처 설계

### 전체 구조

```
features/
├── sentence-share/                      # 문장 공유 (재생성)
│   ├── index.ts
│   ├── api/
│   │   └── sentenceShareApi.ts          # 문장 공유 이미지 fetch API
│   └── ui/
│       └── SentenceShareCardDrawer.tsx  # 문장 카드 3종 선택 + 공유 실행 drawer
│
└── calendar-share/                      # 캘린더 공유 (신규)
    ├── index.ts
    ├── api/
    │   └── calendarShareApi.ts          # 캘린더 공유 이미지 fetch API
    ├── ui/
    │   ├── CalendarShareTypeSheet.tsx   # [1] 공유 타입 선택 bottom sheet
    │   ├── CalendarShareDateDrawer.tsx  # [2] 날짜 선택 drawer (문장 선택 경로)
    │   └── CalendarShareCardDrawer.tsx  # [3] 캘린더 카드 2종 선택 + 공유 실행 drawer
    └── model/
        ├── useCalendarShareFlow.ts      # 전체 플로우 step 상태 관리
        └── calendar-share.types.ts     # ShareType, CardVariant 타입 정의
```

### 수정 대상

| 파일 | 변경 내용 |
|------|----------|
| `widgets/calendar/ui/CalendarWidget.tsx` | 공유 버튼 onClick 연결 + 4개 컴포넌트 렌더링 추가 |
| `features/sentence-select/api/sentenceTodayApi.ts` | `fetchSentenceTodayImage` → `features/sentence-share/api/sentenceShareApi.ts`로 이동 |
| `features/sentence-select/index.ts` | `fetchSentenceTodayImage` export 제거 |
| `widgets/sentence-select/ui/SentenceTodayView.tsx` | import 경로 `sentence-select` → `sentence-share`로 변경 |

### widget 레이어에서의 조합

```tsx
// widgets/calendar/ui/CalendarWidget.tsx
import { CalendarShareCardDrawer, CalendarShareDateDrawer, CalendarShareTypeSheet, useCalendarShareFlow } from "@/features/calendar-share";
import { SentenceShareCardDrawer } from "@/features/sentence-share";

export const CalendarWidget = () => {
  const { step, openTypeSheet, selectType, selectDate, close } = useCalendarShareFlow();

  return (
    <>
      {/* 기존 캘린더 UI */}

      <CalendarShareTypeSheet
        isOpen={step.type === "type-sheet"}
        onSelect={selectType}
        onClose={close}
      />
      <CalendarShareDateDrawer
        isOpen={step.type === "date-drawer"}
        onSelectDate={selectDate}
        onClose={close}
      />
      <SentenceShareCardDrawer
        isOpen={step.type === "card-drawer" && step.shareType !== "calendar"}
        shareType={step.type === "card-drawer" ? step.shareType : undefined}
        date={step.type === "card-drawer" ? step.date : undefined}
        onClose={close}
      />
      <CalendarShareCardDrawer
        isOpen={step.type === "card-drawer" && step.shareType === "calendar"}
        onClose={close}
      />
    </>
  );
};
```

---

## 5. API 설계 (임시 — 서버 확정 전)

### features/sentence-share/api/sentenceShareApi.ts

```ts
// 오늘의 문장 카드 (variant: 1 | 2 | 3)
fetchTodaySentenceCardImage(dailyRecommendationId: number, variant: 1 | 2 | 3): Promise<Blob>
// → GET /recommendations/{dailyRecommendationId}/share?variant={variant}

// 날짜 지정 문장 카드 (variant: 1 | 2 | 3)
fetchSentencePickCardImage(date: string, variant: 1 | 2 | 3): Promise<Blob>
// → GET /daily-sentences/{date}/share?variant={variant}
```

### features/calendar-share/api/calendarShareApi.ts

```ts
// 캘린더 카드 (variant: 1 | 2)
fetchCalendarCardImage(year: number, month: number, variant: 1 | 2): Promise<Blob>
// → GET /calendars/{year}/{month}/share?variant={variant}
```

---

## 6. 타입 정의

```ts
// features/calendar-share/model/calendar-share.types.ts

export type ShareType = "today-sentence" | "calendar" | "sentence-pick";

export type SentenceCardVariant = 1 | 2 | 3;
export type CalendarCardVariant = 1 | 2;

export type CalendarShareStep =
  | { type: "idle" }
  | { type: "type-sheet" }
  | { type: "date-drawer" }
  | { type: "card-drawer"; shareType: ShareType; date?: string };
```

---

## 7. 컴포넌트별 상세 설계

### [1] CalendarShareTypeSheet

- **위치**: `features/calendar-share/ui/`
- **역할**: 공유 타입 3가지 선택 bottom sheet
- **진입**: CalendarWidget 공유 버튼 클릭
- **동작**:
  - '오늘의 문장' → step `card-drawer (shareType: 'today-sentence')`
  - '캘린더' → step `card-drawer (shareType: 'calendar')`
  - '문장 선택' → step `date-drawer`

### [2] CalendarShareDateDrawer

- **위치**: `features/calendar-share/ui/`
- **역할**: 특정 날짜 선택 drawer
- **진입**: TypeSheet에서 '문장 선택' 선택 시
- **동작**: 날짜 선택 → step `card-drawer (shareType: 'sentence-pick', date: 'YYYY-MM-DD')`

### SentenceShareCardDrawer

- **위치**: `features/sentence-share/ui/`
- **역할**: 문장 카드 3종 가로 스크롤 선택 + 공유 실행
- **사용처**: CalendarWidget (오늘의 문장 / 문장 선택 경로), SentenceTodayView (추후 연결)
- **props**: `shareType: 'today-sentence' | 'sentence-pick'`, `date?: string`
- **동작**: 카드 선택 → `sentenceShareApi` 호출 → `navigator.share`

### CalendarShareCardDrawer

- **위치**: `features/calendar-share/ui/`
- **역할**: 캘린더 카드 2종 가로 스크롤 선택 + 공유 실행
- **사용처**: CalendarWidget (캘린더 경로)
- **동작**: 카드 선택 → `calendarShareApi` 호출 → `navigator.share`

### useCalendarShareFlow

- **위치**: `features/calendar-share/model/`
- **역할**: TypeSheet → DateDrawer → CardDrawer 순차 step 상태 관리

```ts
const {
  step,
  openTypeSheet,  // 공유 버튼 클릭 시
  selectType,     // TypeSheet에서 타입 선택 시
  selectDate,     // DateDrawer에서 날짜 선택 시
  close,          // 어느 단계에서든 닫기
} = useCalendarShareFlow();
```

---

## 8. 구현 순서 (Task 단위)

### Phase 1 — 뼈대
- [ ] `calendar-share.types.ts` — `ShareType`, `CalendarShareStep` 타입 정의
- [ ] `calendarShareApi.ts` — 캘린더 카드 API 함수
- [ ] `sentenceShareApi.ts` (재생성) — 문장 카드 API 함수 + `fetchSentenceTodayImage` 이동
- [ ] `useCalendarShareFlow.ts` — step 기반 플로우 상태 훅
- [ ] `features/sentence-select` import 경로 정리

### Phase 2 — UI 컴포넌트
- [ ] `CalendarShareTypeSheet.tsx` — 공유 타입 선택 UI
- [ ] `CalendarShareDateDrawer.tsx` — 날짜 선택 UI
- [ ] `SentenceShareCardDrawer.tsx` — 문장 카드 3종 선택 + 공유
- [ ] `CalendarShareCardDrawer.tsx` — 캘린더 카드 2종 선택 + 공유
- [ ] `CalendarWidget.tsx` 수정 — 공유 버튼 + 컴포넌트 연결

### Phase 3 — 마무리
- [ ] `features/sentence-share/index.ts`, `features/calendar-share/index.ts` barrel export
- [ ] shareview_3 카드 디자인 확정 후 반영
- [ ] `SentenceTodayView` 공유 버튼 → `SentenceShareCardDrawer` 연결
- [ ] `navigator.share` 미지원 fallback 처리

---

## 9. 미결 사항

| 항목 | 내용 |
|------|------|
| shareview_3 디자인 | Figma에서 비어 있음 — 디자인 확정 필요 |
| 캘린더 카드 월 기준 | '캘린더' 선택 시 현재 보고 있는 월 기준인지 확인 필요 |
| 날짜 선택 범위 | '문장 선택' 경로에서 일기가 없는 날짜 처리 방식 (비활성화 or 제외) |
| 공유 후 UX | drawer 닫고 캘린더 유지 vs 토스트 메시지 표시 |
| fallback 공유 방식 | `navigator.share` 미지원 시 이미지 다운로드 or 링크 복사 여부 |
