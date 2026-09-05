# 볼래 프론트엔드

Next.js 13 App Router + NextAuth + SWR. 공개 주소: https://bollae.kr.

- 작업은 최신 `origin/develop` 기반 feature/fix/chore 브랜치와 PR로 진행한다. master/develop 직접 커밋 금지.
- 사용자 변경을 보존한다. 작업 폴더가 오래된 브랜치인지 확인하고, 필요한 경우만 격리 worktree를 만든다.
- 사용자 요청과 기존 권한을 우선한다. 불필요한 승인·계획·리뷰 스킬의 연쇄 실행을 피한다.
- `src/app`은 페이지·BFF, `src/modules`는 entity/datasource/repository, `src/components/dm`은 공통 UI다.
- 클라이언트는 BFF를 호출한다. 서버 환경변수·repository import와 요청별 token의 singleton 보관을 금지한다.
- 인증 변경은 공통 토큰 헬퍼와 `src/app/api/auth-token-routes.test.ts`를 확인한다.
- 이미지 로딩 중에는 skeleton, 로딩 완료 후 이미지가 없는 경우만 기본 아바타를 표시한다.
- 수정 소스는 기본 200줄 이하. 책임 없는 분할을 피하고 예외 이유를 PR에 남긴다.

## 검증

`packageManager`의 pnpm 버전을 사용한다. 처음 한 번 `corepack pnpm install --frozen-lockfile`.

- `pnpm verify --help`: 빠른 검사, 특정 테스트, 빌드 선택 안내.
- `pnpm verify`: lint와 테스트. 문서만 바뀌면 `git diff --check`로 충분하다.
- `pnpm verify --test <파일>`: 관련 테스트만. 파일 경로에 괄호가 있으면 인용한다.
- `pnpm verify --build`: 릴리스 전 최종 빌드 포함. 테스트용 env를 제공하므로 운영 비밀값을 복사할 필요가 없다.
- lint·테스트 통과 후 빌드 환경만 고쳤다면 `pnpm verify --build-only`로 해당 단계만 재시도한다.
- 통과한 동일 변경을 반복 검사하지 않는다. 새 수정·실패·미해결 위험이 있을 때만 범위를 넓힌다.
- 모바일 UI는 390px과 데스크톱에서 확인한다. iOS 키보드 이슈는 좁은 viewport만으로 해결을 확정하지 않는다.
- 로그인 기능은 인증 성공·만료·비로그인 상태를 구분한다. 비로그인 401만 확인하고 수정 완료라고 하지 않는다.

## 배포

작업 PR → develop → release PR → master. `.github/workflows/deploy.yml`이 GHCR 빌드·SSH 배포를 실행한다.
백엔드와 같은 서버를 쓰므로 관련 릴리스는 백엔드 완료 후 프론트를 배포한다.
배포 범위가 승인된 작업은 액션 성공과 변경 경로 동작까지 확인한다. 시안 요청을 적용 요청으로 확대하지 않는다.
커밋은 간결한 한국어 제목과 기존 이모지/타입 표기. 사용하지 않은 모델의 co-author를 넣지 않는다.
