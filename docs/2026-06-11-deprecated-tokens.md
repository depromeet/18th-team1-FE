# Deprecated Token 

`tokens.css` 리팩토링으로 제거된 토큰과, 이름은 유지되지만 값이 변경된 토큰 목록입니다.
아래 항목들을 코드에서 찾아 대체 토큰으로 교체하세요.

---

## 1. 제거된 색상 토큰

### `key-secondary2` → `key-secondary`

| 파일 | 라인 | 변경 전 | 변경 후 |
|------|------|---------|---------|
| `src/app/(nav)/page.tsx` | 40 | `bg-key-secondary2` | `bg-key-secondary` |
| `src/app/(nav)/page.tsx` | 46 | `text-key-secondary2` | `text-key-secondary` |
| `src/features/home/ui/HomeBanner.tsx` | 9 | `bg-key-secondary2` | `bg-key-secondary` |
| `src/features/home/ui/RandomSentenceBanner.tsx` | 62 | `color="key-secondary2"` | `color="key-secondary"` |
| `src/features/diary-emotion/model/emotion.ts` | 11 | `"bg-key-secondary2"` | `"bg-key-secondary"` |
| `src/features/calendar-view/ui/CalendarModeModal.tsx` | 21 | `text-key-secondary2` | `text-key-secondary` |
| `src/features/calendar-view/ui/CalendarBoard.tsx` | 64 | `bg-key-secondary2` | `bg-key-secondary` |
| `src/features/calendar-view/ui/CalendarBoard.tsx` | 70 | `text-key-secondary2` | `text-key-secondary` |
| `src/features/calendar-view/ui/CalendarBoard.tsx` | 73 | `text-key-secondary2` | `text-key-secondary` |
| `src/shared/ui/checkbox.tsx` | 25 | `bg-key-secondary2` | `bg-key-secondary` |
| `src/shared/ui/logo.tsx` | 17 | `text-key-secondary2` | `text-key-secondary` |
| `src/shared/ui/text.tsx` | 43 | `"key-secondary2"` (타입) | `"key-secondary"` |
| `src/shared/ui/dropdown-menu.tsx` | 113 | `bg-key-secondary2` | `bg-key-secondary` |
| `src/entities/sentence/ui/SentenceListCard.tsx` | 26, 33, 41 | `color="key-secondary2"` | `color="key-secondary"` |
| `src/entities/sentence/ui/SentenceCard.tsx` | 18 | `color="key-secondary2"` | `color="key-secondary"` |
| `src/entities/diary/ui/DiaryChip.tsx` | 7 | `text-key-secondary2` | `text-key-secondary` |

### `key-secondary2-0` → `key-secondary-0`

| 파일 | 라인 | 변경 전 | 변경 후 |
|------|------|---------|---------|
| `src/features/calendar-view/ui/CalendarBoard.tsx` | 9 | `bg-key-secondary2-0` | `bg-key-secondary-0` |
| `src/entities/diary/ui/DiaryChip.tsx` | 7 | `bg-key-secondary2-0` | `bg-key-secondary-0` |
| `src/shared/ui/text.tsx` | 48 | `"key-secondary2-0"` (타입) | 제거 (이미 `"key-secondary-0"` 있음) |

### `key-primary-0-1` → `key-primary-100`

같은 값 `#287f83` — 이름만 변경.

| 파일 | 라인 | 변경 전 | 변경 후 |
|------|------|---------|---------|
| `src/features/home/ui/RandomSentenceBanner.tsx` | 32 | `bg-key-primary-0-1` | `bg-key-primary-100` |
| `src/features/home/ui/RandomSentenceBanner.tsx` | 75 | `bg-key-primary-0-1` | `bg-key-primary-100` |

### `key-secondary-0-1` → `key-primary-0`

같은 값 `#e2f1f2` — 이름만 변경.

| 파일 | 라인 | 변경 전 | 변경 후 |
|------|------|---------|---------|
| `src/app/(nav)/page.tsx` | 46 | `text-key-secondary-0-1` | `text-key-primary-0` |

---

## 2. `src/shared/ui/text.tsx` ColorToken 타입 정리

### 제거 (존재하지 않는 토큰)
- `"key-secondary2"` → `"key-secondary"` 로 교체
- `"key-secondary2-0"` → 제거 (이미 `"key-secondary-0"` 있음)
- `"key-secondary-100"` → 제거 (tokens.css에 없는 토큰)

### 추가 (신규 토큰)
- `"key-point"`
- `"key-point-0"`
- `"key-point-50"`
- `"key-point-100"`
- `"key-secondary-50"`

---

## 3. 제거된 타이포그래피 토큰

### `title1-2` → `title1`

| 파일 | 라인 |
|------|------|
| `src/shared/ui/text.tsx` | 7 (타입 제거) |
| `src/entities/sentence/ui/SentenceCard.tsx` | 24 (`variant="title1-2"` → `variant="title1"`) |

### `head0` → `title2`

`head0`는 `1.625rem / 700`으로, 새 `title2`(`1.625rem / 700 / -0.02em`)와 동일.

| 파일 | 라인 |
|------|------|
| `src/shared/ui/text.tsx` | 9 (타입 제거) |
| `src/features/diary-complete/ui/DiaryCompleteView.tsx` | 59 (`variant="head0"` → `variant="title2"`) |

### `subhead6` → `subhead4`

`subhead6`는 `1rem / 600`으로, 새 `subhead4`(`1rem / 600`)와 동일.

| 파일 | 라인 |
|------|------|
| `src/shared/ui/text.tsx` | 18 (타입 제거) |
| `src/entities/sentence/ui/SentenceListCard.tsx` | 25 (`variant="subhead6"` → `variant="subhead4"`) |
| `src/entities/sentence/ui/SentenceCard.tsx` | 18, 32 (`variant="subhead6"` → `variant="subhead4"`) |

### `body2-1` → `subhead5`

`body2-1`은 `0.875rem / 700`으로, 새 `subhead5`(`0.875rem / 700`)와 동일.

| 파일 | 라인 |
|------|------|
| `src/shared/ui/text.tsx` | 20 (타입 제거, 실제 사용 없음) |

### `point1-2` → `point2`

`point1-2`는 `GT Pressura / 1.25rem / 700`이었으나, 새 `point2`는 `GT Pressura / 1.125rem / 700`. **크기 차이 있으므로 시각 확인 필요**.

| 파일 | 라인 |
|------|------|
| `src/shared/ui/text.tsx` | 26 (타입 제거) |
| `src/widgets/calendar/ui/CalendarWritingTimer.tsx` | 22 (`variant="point1-2"` → `variant="point2"`) |

---

## 4. 값이 변경된 토큰 — 시각적 검토 필요

이름은 그대로지만 `font-size` 또는 `font-weight`가 달라졌습니다.
렌더링 결과가 변경되므로 실제 화면에서 디자인 의도에 맞는지 확인하세요.

### `subhead5`: `1rem / 700` → `0.875rem / 700` (font-size 감소)

| 파일 | 라인 |
|------|------|
| `src/widgets/calendar/ui/CalendarDiarySection.tsx` | 49 |
| `src/widgets/calendar/ui/CalendarWritingTimer.tsx` | 18 |
| `src/entities/sentence/ui/SentenceListCard.tsx` | 25 |

### `body3`: `0.875rem / 400` → `0.875rem / 500` (font-weight 증가)

| 파일 | 라인 |
|------|------|
| `src/features/home/ui/HomeSentenceItem.tsx` | 39 |
| `src/features/sentence-select/ui/SentenceDetailView.tsx` | 66 |
| `src/entities/sentence/ui/SentenceCard.tsx` | 35 |
| `src/entities/diary/ui/DiaryCard.tsx` | 40 |
| `src/entities/diary/ui/DiaryDetailCard.tsx` | 70 |

### `caption2`: `0.75rem / 400` → `0.75rem / 500` (font-weight 증가)

사용처가 많으므로 주요 화면 위주로 검토.

| 파일 | 라인 |
|------|------|
| `src/features/home/ui/RandomSentenceBanner.tsx` | 62 |
| `src/features/diary-write/ui/DiaryTextInput.tsx` | 53 |
| `src/entities/post/ui/PostListItem.tsx` | 29 |
| `src/entities/sentence/ui/SentenceTextCard.tsx` | 14 |
| `src/entities/sentence/ui/SentenceListCard.tsx` | 32 |
| `src/entities/diary/ui/DiaryCard.tsx` | 25–27 |
| `src/entities/diary/ui/DiaryDetailCard.tsx` | 56–58 |
| `src/shared/ui/dropdown-menu.tsx` | 188 |

### `point2`: `Milling / 1.25rem / 700` → `GT Pressura / 1.125rem / 700` (font-family + font-size 변경)

폰트 패밀리와 크기가 모두 바뀌므로 반드시 시각 확인.

| 파일 | 라인 |
|------|------|
| `src/features/home/ui/HomeSentenceSection.tsx` | 20 |

---

## 5. Storybook 스토리 정리

`text.stories.tsx`는 위 타입 변경 후 자동으로 타입 오류가 발생할 예정입니다.
타입 정리 완료 후 아래 항목을 함께 제거:

- `"head0"`, `"title1-2"`, `"subhead6"`, `"body2-1"`, `"point1-2"` variant 옵션
- `logo.stories.tsx`에서 `key-secondary2` 컬러 참조 (50번째 줄)
- `text.stories.tsx`에서 `"key-secondary2"` 컬러 참조 (55, 125–126번째 줄)
