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

### 컬러 토큰 (`src/app/globals.css`)

**그레이 스케일**
| 토큰 | 값 | Tailwind 클래스 |
|------|----|-----------------|
| `--color-gray-0` | `#ffffff` | `bg-gray-0` / `text-gray-0` |
| `--color-gray-50` | `#f7f7f7` | `bg-gray-50` / `text-gray-50` |
| `--color-gray-100` | `#eaebeb` | `bg-gray-100` / `text-gray-100` |
| `--color-gray-200` | `#dcdcdc` | `bg-gray-200` / `text-gray-200` |
| `--color-gray-300` | `#8a8a8a` | `bg-gray-300` / `text-gray-300` |
| `--color-gray-400` | `#737373` | `bg-gray-400` / `text-gray-400` |
| `--color-gray-500` | `#5c5c5c` | `bg-gray-500` / `text-gray-500` |
| `--color-gray-600` | `#303030` | `bg-gray-600` / `text-gray-600` |
| `--color-gray-700` | `#090909` | `bg-gray-700` / `text-gray-700` |

**시맨틱 토큰 (우선 사용)**
| 토큰 | 용도 | Tailwind 클래스 |
|------|------|-----------------|
| `--color-background` | 앱 기본 배경(흰색) | `bg-background` |
| `--color-foreground` | 기본 텍스트 | `text-foreground` |
| `--color-muted` | 서브 배경(#f7f7f7) | `bg-muted` |
| `--color-muted-foreground` | 보조 텍스트 | `text-muted-foreground` |
| `--color-border` | 테두리 | `border-border` |
| `--color-primary` | 주요 색상 | `bg-primary` / `text-primary` |
| `--color-destructive` | 오류/삭제 | `bg-destructive` / `text-destructive` |

**키 컬러 (Key Color)**
| 토큰 | 값 | Tailwind 클래스 |
|------|----|-----------------|
| `--color-key-primary` | `#8e8100` | `bg-key-primary` / `text-key-primary` |
| `--color-key-secondary` | `#a4d4d6` | `bg-key-secondary` / `text-key-secondary` |
| `--color-key-secondary2` | `#6b1e3c` | `bg-key-secondary2` / `text-key-secondary2` |

**키 컬러 베리에이션 (Key Color Variation)**
| 토큰 | 값 | Tailwind 클래스 |
|------|----|-----------------|
| `--color-key-primary-0` | `#6a6103` | `bg-key-primary-0` / `text-key-primary-0` |
| `--color-key-primary-100` | `#e1ddb5` | `bg-key-primary-100` / `text-key-primary-100` |
| `--color-key-secondary-0` | `#d1e9ea` | `bg-key-secondary-0` / `text-key-secondary-0` |
| `--color-key-secondary-100` | `#287f83` | `bg-key-secondary-100` / `text-key-secondary-100` |
| `--color-key-secondary2-0` | `#e5d1d9` | `bg-key-secondary2-0` / `text-key-secondary2-0` |

**서브 컬러 (Sub Color)**
| 토큰 | 값 | Tailwind 클래스 |
|------|----|-----------------|
| `--color-sub-saturday` | `#2e7df6` | `bg-sub-saturday` / `text-sub-saturday` |
| `--color-sub-sunday` | `#ff6f36` | `bg-sub-sunday` / `text-sub-sunday` |

### 타이포그래피 토큰

모든 텍스트는 아래 유틸리티 클래스를 사용합니다. `font-size`, `font-weight`, `line-height`, `letter-spacing`이 한 번에 적용됩니다.

**Pretendard (기본 서체)**
| 클래스 | size | weight | 용도 |
|--------|------|--------|------|
| `.title1` | 1.75rem | 900 | 대제목 (Black) |
| `.title2` | 1.25rem | 800 | 제목 (ExtraBold) |
| `.head0` | 1.625rem | 700 | 페이지 대제목 (Bold) |
| `.head1` | 1.625rem | 600 | 페이지 대제목 |
| `.head2` | 1.25rem | 600 | 섹션 제목 |
| `.head3` | 1.25rem | 500 | 섹션 부제목 |
| `.subhead1` | 1.125rem | 700 | 강조 소제목 |
| `.subhead2` | 1.125rem | 500 | 소제목 |
| `.subhead3` | 1.125rem | 400 | 소제목(보통) |
| `.subhead4` | 1.0625rem | 400 | 소제목(작은) |
| `.subhead5` | 1rem | 700 | 강조 본문 |
| `.subhead6` | 1rem | 600 | 세미볼드 본문 |
| `.body1` | 1rem | 500 | 기본 본문 |
| `.body2-1` | 0.875rem | 700 | 작은 본문 (Bold) |
| `.body2` | 0.875rem | 500 | 작은 본문 |
| `.body3` | 0.875rem | 400 | 작은 본문(보통) |
| `.caption1` | 0.75rem | 600 | 강조 캡션 |
| `.caption2` | 0.75rem | 400 | 캡션 |

**GT Pressura Trial / Milling Trial (보조 서체 — 숫자·영문 강조용)**
| 클래스 | size | weight | 서체 | 용도 |
|--------|------|--------|------|------|
| `.point1` | 1.5rem | 700 | GT Pressura Trial | 숫자·월 강조 (대) |
| `.point1-2` | 1.25rem | 700 | GT Pressura Trial | 숫자·월 강조 (중) |
| `.point2` | 1.25rem | 400 | Milling Trial | 숫자·월 강조 (Milling) |
| `.point3` | 1rem | 700 | GT Pressura Trial | 숫자·월 강조 (소) |

```tsx
// ✅ 타이포그래피 토큰 사용
<h1 className="title1 text-gray-700">책 문장 일기</h1>
<h2 className="head1 text-gray-700">오늘의 기록</h2>
<p className="body1 text-gray-400">오늘의 문장을 기록하세요</p>
<span className="point1 text-gray-700">24</span>

// ❌ 하드코딩
<h1 className="text-[28px] font-black leading-[1.5]">책 문장 일기</h1>
```

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
