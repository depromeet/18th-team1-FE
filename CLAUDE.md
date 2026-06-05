# CLAUDE.md

## 자주 쓰는 명령어

```bash
pnpm dev                              # 개발 서버
pnpm check                            # Biome lint + format 자동 수정
pnpm typecheck                        # tsc --noEmit
pnpm dlx shadcn@latest add <component> # shadcn/ui 컴포넌트 추가
```

## 폴더 구조 (FSD)

```text
src/
├── app/        # Next.js 라우팅, Provider
├── widgets/    # feature 조합 UI 블록
├── features/   # 사용자 행동 단위 기능
├── entities/   # 도메인 모델
├── shared/     # api · config · lib · ui · hooks · types
└── store/      # Zustand 전역 스토어
```

- 의존 방향: `app → widgets → features → entities → shared`. 상향/동등 레이어 참조 금지
- Public API 규칙: 각 슬라이스는 `index.ts` barrel을 통해서만 외부에 공개.

@docs/folder-structure.md

## 파일 배치 가이드

새 파일 생성 시 다음 규칙에 따라 적절한 위치에 배치:

| 파일 유형 | 위치 | 예시 |
|----------|------|------|
| UI 컴포넌트 (재사용) | `shared/ui/` | `Button.tsx`, `Input.tsx` |
| 비즈니스 로직 (사용자 행동) | `features/{기능명}/` | `features/book-search/` |
| 도메인 데이터 모델 | `entities/{엔티티명}/` | `entities/book/`, `entities/user/` |
| 여러 feature 조합 | `widgets/{위젯명}/` | `widgets/book-list-with-filter/` |
| API 클라이언트 | `shared/api/` | `client.ts`, `endpoints.ts` |
| 유틸/헬퍼 함수 | `shared/lib/` | `formatDate.ts`, `validation.ts` |
| 공통 커스텀 훅 | `shared/hooks/` | `useDebounce.ts` |
| 타입 정의 (공통) | `shared/types/` | `common.ts`, `api.ts` |
| Zustand 스토어 | `store/{스토어명}/` | `store/auth/`, `store/ui/` |

## FSD 슬라이스 구조 예시

새 기능 추가 시 슬라이스 내부 구조:

```text
features/
└── book-search/
    ├── index.ts          # public API (외부 노출 인터페이스)
    ├── ui/
    │   └── SearchBar.tsx # UI 컴포넌트
    ├── model/
    │   └── useSearchBooks.ts # 비즈니스 로직, 상태 관리
    └── api/
        └── searchBooks.ts # API 호출 함수
```

## 코딩 규칙 요약

- 변수/함수 `camelCase`, 컴포넌트/타입 `PascalCase`, 상수 `UPPER_SNAKE_CASE`
- 함수는 Arrow Function 사용
- boolean: `is/has/should` 접두사 · 이벤트 핸들러: 내부 `handle*`, props `on*`
- 절대 경로 `@/*` → `src/*`
- 줄임말 지양: `btn` (✗) → `button` (✓)

@docs/naming-convention.md

## 커밋 규칙

- 형식: `{tag}: {내용} (#이슈번호)`
  - 이슈 번호는 `prepare-commit-msg` 훅이 브랜치명에서 자동 추가
- 태그: `feat` `fix` `refactor` `test` `docs` `style` `chore` `ci` `perf` `build` `revert`

@docs/commit-convention.md

## 참고 문서

| 문서 | 내용 |
|------|------|
| @docs/folder-structure.md | FSD 레이어 규칙, barrel export 상세 |
| @docs/naming-convention.md | 네이밍 규칙 상세 |
| @docs/commit-convention.md | 커밋 태그, Gitmoji 옵션 |
| @docs/packages.md | 패키지 목록 및 설정 방법 |
| @docs/api-specification.md | API 엔드포인트, TanStack Query 가이드 |
| @docs/ui-markup-guide.md | Figma MCP 활용, 디자인 토큰, 마크업 규칙 |
| @docs/icon-guide.md | 아이콘 컴포넌트 추가 및 사용 규칙 |
