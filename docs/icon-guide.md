# 🖼️ 아이콘 컴포넌트 가이드

프로젝트의 SVG 아이콘 컴포넌트 추가 및 사용 규칙을 정의합니다.

---

## 파일 구조

```text
shared/ui/icons/
├── BaseIcon.tsx       # SVG 래퍼 (수정 불필요)
├── icon.types.ts      # IconProps 타입
├── IcHome.tsx         # 아이콘 컴포넌트 예시
├── IcCalendar.tsx
├── IcChevronLeft.tsx
└── index.ts           # barrel export
```

---

## 네이밍 규칙

- 파일명/컴포넌트명: `Ic` 접두사 + PascalCase → `IcArrowRight`, `IcClose`
- Figma 아이콘 이름을 기준으로 네이밍

---

## variant 패턴

아이콘에 filled(default)와 outline(line) 두 가지 스타일이 있을 때 `variant` prop을 사용합니다.

| variant   | 용도                            | fill                             |
|-----------|---------------------------------|----------------------------------|
| `default` | filled 아이콘 (활성 상태 등)    | `currentColor`                   |
| `line`    | outline 아이콘 (비활성 상태 등) | `none` + `stroke="currentColor"` |

---

## 새 아이콘 추가 방법

### 1. Figma에서 SVG 경로 확인

Figma에서 아이콘 노드 선택 후 `get_design_context`로 path 데이터 추출.
또는 SVG 코드를 직접 전달하면 Claude Code가 아래 규칙에 맞게 변환해줍니다.

### 2. 아이콘 파일 생성 (`src/shared/ui/icons/IcArrowRight.tsx`)

```tsx
import { BaseIcon } from "./BaseIcon";
import type { IconProps } from "./icon.types";

// variant가 있는 경우
interface IcArrowRightProps extends IconProps {
  variant?: "default" | "line";
}

export const IcArrowRight = ({
  variant = "default",
  ...props
}: IcArrowRightProps): React.ReactElement => {
  if (variant === "line") {
    return (
      <BaseIcon viewBox="0 0 24 24" fill="none" {...props}>
        <path d="..." stroke="currentColor" />
      </BaseIcon>
    );
  }

  return (
    <BaseIcon viewBox="0 0 24 24" {...props}>
      <path d="..." />
    </BaseIcon>
  );
};
```

```tsx
// variant가 없는 경우 (단일 스타일 아이콘)
export const IcClose = (props: IconProps): React.ReactElement => (
  <BaseIcon viewBox="0 0 24 24" {...props}>
    <path d="..." />
  </BaseIcon>
);
```

### 3. `index.ts`에 barrel export 추가

```ts
// src/shared/ui/icons/index.ts
export { IcArrowRight } from "./IcArrowRight";
```

### 4. 사용

```tsx
import { IcArrowRight } from "@/shared/ui/icons";

<IcArrowRight size={24} className="text-foreground" />
<IcArrowRight size={20} className="text-muted-foreground" variant="line" />
```

---

## 주의사항

- 색상은 항상 `className="text-*"` Tailwind 클래스로 제어 (`fill="currentColor"` 덕분에 동작)
- `size` prop으로 width/height 동시 제어 (기본값: 24)
- `viewBox`는 아이콘 원본 크기에 맞게 지정 (Figma에서 확인)
- 아이콘 SVG에 `fill`이나 `stroke` 색상을 하드코딩하지 않기
