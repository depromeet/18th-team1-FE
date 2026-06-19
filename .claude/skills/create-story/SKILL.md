---
name: create-story
description: shared/ui 컴포넌트의 Storybook 스토리 파일을 자동 생성하는 스킬. 컴포넌트 파일명을 인자로 받아 .stories.tsx 파일을 생성한다.
allowed-tools: Read Glob Grep Write Bash
---

# 스토리 파일 자동 생성 스킬

인자(args)로 전달된 컴포넌트 파일명을 기반으로 `src/shared/ui/` 내의 컴포넌트를 분석하고 스토리 파일을 생성한다.

**인자 형식 예시**: `option-menu`, `button`, `icons/ic-home`

## 1단계: 컴포넌트 파일 탐색

args로 받은 이름으로 `src/shared/ui/` 내에서 컴포넌트 파일을 찾는다.

- 기본 탐색 경로: `src/shared/ui/{args}.tsx`
- 서브폴더 포함 탐색: `src/shared/ui/**/{args}.tsx`
- 파일이 없으면 사용자에게 정확한 경로를 확인하고 중단한다.
- 이미 `{args}.stories.tsx`가 존재하면 사용자에게 덮어쓸지 확인 후 진행한다.

## 2단계: 컴포넌트 분석

찾은 컴포넌트 파일을 Read로 읽어 다음을 파악한다:

### 파악할 항목
- **export된 컴포넌트명** (default export vs named export)
- **Props 타입/인터페이스** — 어떤 props를 받는지
- **variant, size 등 union 타입 props** — Controls argType으로 활용
- **필수 props vs 선택 props** — args 기본값 설정에 활용
- **"use client" 여부** — 스토리 파일 상단에도 추가 필요
- **import된 외부 의존성** — 스토리에서 재사용 가능한지 확인
- **복합 컴포넌트 여부** (DropdownMenu처럼 여러 서브컴포넌트로 구성되는지)

## 3단계: 스토리 생성 계획 수립

분석 결과를 바탕으로 어떤 스토리를 만들지 계획하고 사용자에게 출력한다:

```
## 스토리 생성 계획

- 컴포넌트: {ComponentName}
- 출력 경로: src/shared/ui/{args}.stories.tsx
- 생성할 스토리:
  1. Default — 기본 상태
  2. {variant별 스토리} — (variant props가 있는 경우)
  3. ...

진행할까요?
```

사용자가 확인하면 4단계로 진행한다.

## 4단계: 스토리 파일 생성

아래 규칙에 따라 스토리 파일을 Write로 생성한다.

### 파일 위치
- 컴포넌트와 동일한 디렉토리에 `{args}.stories.tsx` 생성
- 예: `src/shared/ui/button.tsx` → `src/shared/ui/button.stories.tsx`

### 필수 규칙

**imports**
```tsx
// "use client" 컴포넌트라면 상단에 추가
"use client";

import type { Meta, StoryObj } from "@storybook/nextjs";
// 컴포넌트 named export 그대로 import
import { ComponentName } from "./component-name";
```

**meta 설정**
```tsx
const meta: Meta<typeof ComponentName> = {
  title: "ComponentName",        // 컴포넌트명 그대로 (폴더 없이)
  component: ComponentName,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",          // 기본값. 전체 너비 컴포넌트면 "fullscreen"
  },
  argTypes: {
    // variant, size 등 union 타입은 select control로 정의
    variant: {
      control: "select",
      options: ["default", "outline", ...],
    },
  },
};
```

**스토리 구성 우선순위**
1. `Default` — args로 기본값 지정. Controls에서 조작 가능하게
2. variant/size가 여러 개면 `All{Variants/Sizes}` — render로 나란히 배치
3. 상태(disabled, loading 등)가 있으면 각 상태별 스토리
4. 복합 컴포넌트는 실제 사용 패턴을 보여주는 스토리 (render 사용)

**코딩 컨벤션 준수**
- Arrow Function + 명시적 반환 타입 (`: React.ReactElement`, `: Story` 등)
- 변수명 camelCase, 컴포넌트명 PascalCase
- 디자인 토큰 사용 (`text-foreground`, `bg-muted` 등 하드코딩 금지)
- 타이포그래피 토큰 사용 (`.body1`, `.caption2` 등)
- 한글 샘플 텍스트 사용 (이 서비스는 한국어 서비스)

**복합 컴포넌트 (서브컴포넌트가 있는 경우)**
- Meta의 `component`를 루트 컴포넌트로 지정
- render 함수 안에서 실제 조합 패턴을 보여줌
- 주요 사용 케이스별로 스토리 분리

### 스토리 예시 패턴

**단순 컴포넌트 (props 기반)**
```tsx
export const Default: Story = {
  args: {
    children: "버튼",
    variant: "default",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Component variant="default">기본</Component>
      <Component variant="outline">아웃라인</Component>
    </div>
  ),
};
```

**복합 컴포넌트 (조합 패턴)**
```tsx
export const Basic: Story = {
  render: () => (
    <RootComponent>
      <TriggerComponent>열기</TriggerComponent>
      <ContentComponent>
        <ItemComponent>항목</ItemComponent>
      </ContentComponent>
    </RootComponent>
  ),
};
```

## 5단계: 검증

생성 후 다음을 확인한다:

```bash
pnpm typecheck 2>&1 | grep "{생성한 파일명}"
```

타입 에러가 있으면 수정하고, 없으면 완료를 알린다.

완료 메시지 형식:
```
✅ 스토리 파일 생성 완료

- 파일: src/shared/ui/{args}.stories.tsx
- 스토리: Default, AllVariants, ...

pnpm storybook 으로 확인할 수 있습니다.
```
