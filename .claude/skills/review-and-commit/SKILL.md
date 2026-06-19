---
name: review-and-commit
description: 변경사항 코드리뷰 후 커밋 그룹화하여 커밋하는 스킬. 코드리뷰 + 커밋 작성이 필요할 때 사용.
disable-model-invocation: true
allowed-tools: Read Grep Glob Bash Edit
---

# 변경사항 코드리뷰 & 커밋 스킬

다음 단계를 순서대로 수행하라. 각 단계가 완료되기 전에 다음 단계로 넘어가지 말 것.

## 1단계: 변경사항 파악

```bash
git status
git diff
git diff --staged
```

를 실행해 현재 변경사항 전체를 파악하라. 파일 목록, 수정 내용, 추가/삭제된 코드를 모두 확인하라.

## 2단계: 코드리뷰

변경된 파일들을 Read 도구로 읽어 다음 관점에서 검토하라:

### 보안

- SQL Injection, XSS, CSRF 등 OWASP Top 10 취약점
- 민감한 정보(API 키, 비밀번호, 토큰) 하드코딩 여부
- 입력값 검증 누락

### 코드 컨벤션 (CLAUDE.md 기준)

- 변수/함수 `camelCase`, 컴포넌트/타입 `PascalCase`, 상수 `UPPER_SNAKE_CASE`
- Arrow Function 사용 및 반환 타입 명시 여부
- boolean 변수 `is/has/should` 접두사
- 이벤트 핸들러 내부 `handle*`, props `on*` 구분
- 줄임말 지양 (`btn` → `button` 등)
- 절대 경로 `@/*` 사용 여부
- FSD 의존 방향 준수 여부 (`app → widgets → features → entities → shared`)
- Public API barrel export (`index.ts`) 사용 여부

### 성능

- 불필요한 리렌더링 유발 코드
- 메모이제이션 누락 (`useMemo`, `useCallback`, `memo`)
- 무한 루프 가능성
- 번들 사이즈에 영향을 줄 수 있는 heavy import

### 코드 퀄리티

- 중복 코드
- 함수/컴포넌트 책임 과다 (단일 책임 원칙)
- 타입 안전성 (any 남용, 타입 단언 남용)
- 미사용 변수/import
- 에러 핸들링 누락

검토 결과를 다음 형식으로 출력하라:

```
## 코드리뷰 결과

### [파일명:라인번호] 심각도: 제목
내용 설명

(문제 없으면 "✅ 이슈 없음" 출력)
```

심각도 기준:

- **🔴 Critical**: 즉시 수정 필요 (보안 취약점, 빌드 오류)
- **🟡 Warning**: 수정 권장 (컨벤션 위반, 성능 이슈)
- **🔵 Info**: 참고 사항 (개선 제안)

**Critical 이슈가 있으면 사용자에게 먼저 수정할지 물어보고, 수정 후 다음 단계로 진행하라.**

## 3단계: 커밋 그룹화

변경사항을 **논리적으로 연관된 단위**로 그룹화하라. 그룹화 기준:

- 같은 기능/버그수정에 속하는 파일들을 한 커밋으로
- 설정/인프라 변경은 기능 변경과 분리
- 문서 변경은 별도 커밋으로 분리
- 리팩토링은 기능 추가와 분리

그룹화 제안을 다음 형식으로 출력하라:

```
## 커밋 그룹화 제안

### 커밋 1: {tag}: {내용 요약}
- 파일1.ts — 변경 이유
- 파일2.tsx — 변경 이유

### 커밋 2: {tag}: {내용 요약}
- 파일3.ts — 변경 이유
```

태그는 `docs/commit-convention.md` 기준:
`feat` `fix` `refactor` `test` `docs` `style` `chore` `ci` `perf` `build` `revert`

커밋 메시지 형식: `{tag}: {내용} ({이슈번호 자동추가됨})`

- 제목은 명령형, 마침표 없이, 50자 이내 권장
- 브랜치명에 `#숫자` 패턴이 있으면 이슈번호는 husky 훅이 자동 추가

## 4단계: 사용자 검토 및 승인

코드리뷰 결과와 커밋 그룹화 제안을 출력한 뒤, **반드시 사용자에게 다음을 확인하라**:

```
위 코드리뷰 결과와 커밋 그룹화 계획을 검토해주세요.
- 수정이 필요한 이슈가 있으신가요?
- 커밋 그룹화 방식이 적절한가요?
- 커밋 메시지를 수정하고 싶으신가요?

진행해도 되면 "진행" 또는 "ok"라고 답해주세요.
```

사용자가 승인하기 전까지 절대로 커밋을 실행하지 말 것.

## 5단계: 커밋 실행

사용자가 승인하면 그룹별로 순서대로 커밋을 실행하라.

각 커밋마다:

1. 해당 파일들을 `git add` 로 스테이징
2. 커밋 메시지 작성 (HEREDOC 형식 사용)
3. `git status` 로 결과 확인

```bash
# 예시
git add src/features/auth/ui/LoginForm.tsx src/features/auth/model/useLogin.ts
git commit -m "$(cat <<'EOF'
feat: 로그인 폼 유효성 검사 추가
EOF
)"
```

모든 커밋 완료 후 `git log --oneline -5` 로 결과를 출력하라.
