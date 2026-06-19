# 📦 패키지 정보

본 문서는 프로젝트에 설치된 **의존성 목록과 역할**, 그리고 주요 패키지의 설정 포인트를
정리합니다. 정확한 버전은 [package.json](../package.json) 및
[pnpm-lock.yaml](../pnpm-lock.yaml) 이 원본(single source of truth) 입니다.

## 🏗️ 핵심 런타임

| 패키지 | 버전 | 용도 |
|--------|------|------|
| `next` | `16.x` | 프레임워크 (App Router) |
| `react` / `react-dom` | `19.x` | UI 라이브러리 |
| `typescript` | `5.x` | 정적 타입 |

## 🎨 스타일링 & UI

| 패키지 | 용도 |
|--------|------|
| `tailwindcss` `4.x` | 유틸리티 퍼스트 CSS |
| `@tailwindcss/postcss` | Tailwind v4 PostCSS 플러그인 |
| `tw-animate-css` | Tailwind v4 용 애니메이션 유틸 (shadcn/ui 권장) |
| `class-variance-authority` | variant 기반 클래스 조합 |
| `clsx` | 조건부 클래스네임 병합 |
| `tailwind-merge` | Tailwind 클래스 충돌 해소 |
| `lucide-react` | 아이콘 세트 (shadcn/ui 기본) |
| `@radix-ui/react-slot` | shadcn/ui 의 `asChild` 구현체 |

shadcn/ui 컴포넌트는 `src/shared/ui/` 에 배치됩니다. 추가 컴포넌트 설치 예시:

```bash
pnpm dlx shadcn@latest add card dialog input label
```

> `components.json` 의 alias 가 `@/shared/ui` 로 지정되어 있어 자동으로 FSD 경로에
> 설치됩니다.

## 🔁 상태 & 데이터

| 패키지 | 용도 |
|--------|------|
| `@tanstack/react-query` | 서버 상태(fetch/cache/mutate) 관리 |
| `@tanstack/react-query-devtools` | 개발자 도구 (dev 환경에서만 렌더) |
| `zustand` | 경량 전역 상태 관리 |

QueryClient 는 [src/shared/api/query-client.ts](../src/shared/api/query-client.ts) 에,
Provider 는 [src/app/providers.tsx](../src/app/providers.tsx) 에 정의되어 있습니다.

## 🧹 품질 & 자동화

| 패키지 | 용도 |
|--------|------|
| `@biomejs/biome` | 린터 + 포매터 (ESLint + Prettier 대체) |
| `husky` | Git 훅 매니저 |
| `lint-staged` | 스테이지된 파일에만 린트/포맷 실행 |
| `@commitlint/cli` | 커밋 메시지 검증 |
| `@commitlint/config-conventional` | Conventional Commits 규칙 |

### Husky 훅 구성

| 훅 | 파일 | 역할 |
|----|------|------|
| `pre-commit` | [.husky/pre-commit](../.husky/pre-commit) | `lint-staged` 실행 |
| `commit-msg` | [.husky/commit-msg](../.husky/commit-msg) | `commitlint` 로 메시지 검증 |
| `prepare-commit-msg` | [.husky/prepare-commit-msg](../.husky/prepare-commit-msg) | 브랜치명에서 이슈 번호 자동 추가 |

### Biome 주요 스크립트

| 스크립트 | 설명 |
|----------|------|
| `pnpm lint` | 린트 검사만 |
| `pnpm lint:fix` | 린트 자동 수정 |
| `pnpm format` | 포맷 자동 수정 |
| `pnpm check` | lint + format + import 정렬 일괄 수정 |
| `pnpm typecheck` | TypeScript 타입 체크 |

### Biome 활용법

#### VSCode 저장 시 자동 포맷 (`.vscode/settings.json` 설정됨)

- 파일 저장하면 포맷 + import 정렬 자동 적용
- lint 에러는 VSCode에서 빨간줄/노란줄로 표시

#### 커밋 시 자동 수정 (`lint-staged` + `--unsafe` 설정됨)

- 스테이징된 파일에만 `biome check --write --unsafe` 실행
- 포맷, 미사용 import/변수 자동 제거 후 커밋

#### fix 범위 차이

| | `--write` | `--write --unsafe` |
| --- | --- | --- |
| 포맷, 스타일 자동 수정 | ✅ | ✅ |
| 미사용 import/변수 제거 | ❌ | ✅ |

#### 에러 vs 경고

- `error` → 커밋 차단 (예: `noExplicitAny`, `noUnusedVariables`)
- `warn` → 커밋 허용, VSCode에서 노란줄 표시 (예: `useExplicitType`)

## 🔧 빌드/개발 스크립트

| 스크립트 | 설명 |
|----------|------|
| `pnpm dev` | 개발 서버 실행  |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm start` | 빌드 결과물 실행 |


## 🛠️ 새 패키지 추가 시 체크리스트

- [ ] 같은 기능의 패키지가 이미 설치되어 있지 않은가?
- [ ] 라이선스가 프로젝트 정책에 부합하는가?
- [ ] 이 문서(`packages.md`) 에 추가했는가?
