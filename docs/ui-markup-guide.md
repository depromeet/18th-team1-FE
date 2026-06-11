# 🎨 UI 마크업 가이드

Figma MCP를 활용한 UI 마크업 작업 규칙과 플로우를 정의합니다.
이 문서는 Claude Code가 참조하여 일관된 마크업을 생성하기 위한 기준입니다.

---

## 🔌 Figma MCP 활용법

### 연동 방법

Claude Code에 Figma MCP(`figma-desktop`)가 연동되어 있어야 합니다.
Figma 데스크탑 앱에서 원하는 노드를 선택한 뒤 Claude에게 요청하세요.

### 사용 도구

| 도구                 | 용도                                   |
| -------------------- | -------------------------------------- |
| `get_design_context` | 선택한 노드의 코드 및 스타일 정보 추출 |
| `get_screenshot`     | 선택한 노드의 스크린샷 확인            |
| `get_variable_defs`  | 피그마 변수(토큰) 목록 확인            |

### 작업 플로우

1. Figma에서 마크업할 컴포넌트/화면 선택
2. Claude에게 "선택한 영역 마크업해줘" 요청
3. `get_design_context`로 스타일 및 구조 추출
4. 아래 규칙에 따라 프로젝트 코드로 변환

> **주의:** `get_design_context`가 반환하는 코드는 참고용입니다.
> 하드코딩된 값, 인라인 스타일 등을 그대로 쓰지 말고 반드시 아래 규칙에 따라 변환하세요.

---

## 🎨 디자인 토큰 사용 규칙

### 절대 규칙: 하드코딩 금지

```tsx
// ❌ 하드코딩
<div className="bg-[#f7f7f7] text-[#090909]" />
<p style={{ color: '#737373' }} />

// ✅ 디자인 토큰 사용
<div className="bg-muted text-foreground" />
<p className="text-muted-foreground" />
```

### 토큰 목록 확인

컬러 및 타이포그래피 토큰 전체 목록은 두 곳에서 확인합니다.

- **CSS 변수 정의** → [`src/shared/ui/tokens.css`](../src/shared/ui/tokens.css)
- **시각적 확인** → Storybook `@tokens` 스토리 ([`src/shared/ui/tokens.stories.tsx`](../src/shared/ui/tokens.stories.tsx))

토큰 추가·수정이 필요하면 `tokens.css`를 편집하고, `tokens.stories.tsx`에도 반영하세요.

### 단위 규칙

| 속성                       | 단위                      | 예시                                    |
| -------------------------- | ------------------------- | --------------------------------------- |
| `font-size`                | rem                       | `text-[1.25rem]` (토큰 우선)            |
| `padding`, `margin`, `gap` | Tailwind 스케일(rem)      | `p-4`, `gap-6`                          |
| `width`, `height`          | Tailwind 스케일 또는 rem  | `w-full`, `h-12`                        |
| `border-radius`            | Tailwind 스케일 또는 토큰 | `rounded-lg`, `rounded-[var(--radius)]` |

```tsx
// ✅
<div className="p-4 gap-3 rounded-lg" />

// ❌ px 하드코딩
<div className="p-[16px] gap-[12px] rounded-[10px]" />
```

---

## 🧱 컴포넌트 배치 규칙

### 어디에 만들 것인가?

| 상황                           | 위치                    | 예시                                                            |
| ------------------------------ | ----------------------- | --------------------------------------------------------------- |
| 여러 곳에서 재사용되는 원시 UI | `shared/ui/`            | `button.tsx`, `option-menu.tsx`                                 |
| shadcn/ui 컴포넌트             | `shared/ui/`            | `pnpm dlx shadcn@latest add card`                               |
| 아이콘 컴포넌트                | `shared/ui/icons/`      | `IcHome`, `IcCalendar` — [@icon-guide.md](./icon-guide.md) 참고 |
| 사용자 행동 단위 기능          | `features/{기능명}/ui/` | `EmotionSelectCard`                                             |
| 여러 feature를 조합한 블록     | `widgets/{위젯명}/ui/`  | `NavBar`, `DiaryBoard`                                          |

### widgets 컴포넌트 작성 원칙

widgets는 `shared/ui`의 공통 컴포넌트를 최대한 조합해서 만듭니다.

```tsx
// ✅ shared/ui 컴포넌트 활용
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

export const DiaryCard = (): React.ReactElement => (
  <Card className="p-4">
    <p className="body1 text-foreground">...</p>
    <Button variant="outline">수정</Button>
  </Card>
);

// ❌ 직접 구현
export const DiaryCard = (): React.ReactElement => (
  <div className="rounded-[10px] border border-[#eaebeb] p-[16px]">...</div>
);
```

### shadcn/ui 컴포넌트 추가

```bash
pnpm dlx shadcn@latest add <component>
# 예시
pnpm dlx shadcn@latest add card dialog input label sheet
```

추가된 컴포넌트는 자동으로 `src/shared/ui/`에 설치됩니다.

---

## 🔄 Figma → 코드 변환 체크리스트

Figma에서 코드를 받아 변환할 때 반드시 확인하세요.

### 컬러

- [ ] 인라인 hex 값 → 디자인 토큰으로 교체 (`bg-[#f7f7f7]` → `bg-muted`)
- [ ] `style={{ color: '...' }}` → Tailwind 클래스로 교체

### 타이포그래피

- [ ] `text-[26px] font-semibold leading-[1.5]` 조합 → `.head1` 단일 클래스로 교체
- [ ] `font-['Pretendard:Bold']` 인라인 폰트 → 제거 (토큰으로 자동 적용)

### 간격/크기

- [ ] `px-[20px]` → `px-5` (Tailwind 스케일 우선)
- [ ] `gap-[12px]` → `gap-3`
- [ ] 피그마의 고정 px 값 → 가능하면 Tailwind 스케일로 변환

### 구조

- [ ] `data-node-id` 속성 제거
- [ ] 반복 요소 → `.map()` 리팩토링
- [ ] 하드코딩 텍스트 → props로 추출 (재사용 컴포넌트인 경우)
- [ ] 이벤트 핸들러 → `handle*` 네이밍

### 컴포넌트

- [ ] 버튼 → `<Button>` (shadcn) 사용
- [ ] 인풋 → `<Input>` (shadcn) 사용
- [ ] 카드형 레이아웃 → `<Card>` (shadcn) 고려

---

## 📐 레이아웃 기준

- **모바일 기준 너비:** 375px (`md:max-w-93.75` in layout)
- **좌우 패딩:** 20px (`px-5` in layout) — 페이지 콘텐츠에 추가 padding 불필요
- **앱 배경색:** `bg-muted` (#f7f7f7)
- **카드/화이트 영역:** `bg-background` (#ffffff)

---

## ✅ 최종 체크리스트

마크업 완료 후 확인:

- [ ] 하드코딩 색상 없음 (grep `#[0-9a-fA-F]` 로 확인)
- [ ] 타이포그래피 토큰 사용 (`.head*`, `.subhead*`, `.body*`, `.caption*`, `.title*`)
- [ ] px 단위 최소화 (rem 또는 Tailwind 스케일 사용)
- [ ] `shared/ui` 공통 컴포넌트 최대한 활용
- [ ] FSD 의존 방향 준수 (`app → widgets → features → entities → shared`)
- [ ] barrel export (`index.ts`) 통해서만 외부 import
- [ ] 함수 반환 타입 명시 (`: React.ReactElement`, `: void` 등)
