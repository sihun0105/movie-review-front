# Search Indexing Signals Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 검색엔진이 공개 페이지를 일관되게 크롤링하고 전체 영화 상세 URL을 발견할 수 있도록 SEO 신호를 바로잡는다.

**Architecture:** 홈의 TOP 10 영화 API는 유지하고, 백엔드에 사이트맵 전용 경량 gRPC/REST 조회를 추가한다. 프론트 사이트맵은 이 API의 `movieCd`, `updatedAt`만 사용하며 robots와 구조화 데이터의 충돌 신호를 제거한다.

**Tech Stack:** NestJS 10, gRPC/Protocol Buffers, Prisma, Next.js 13 Metadata Routes, Vitest

## Global Constraints

- 공개 페이지 조회에 인증을 요구하지 않는다.
- 수정 파일은 공백과 주석을 포함해 200줄 이하로 유지한다.
- 기존 `/movie` TOP 10 응답 계약은 변경하지 않는다.

---

### Task 1: 전체 영화 사이트맵 API

**Files:**

- Modify: `proto/movie.proto`
- Modify: `apps/movie/src/movie-read.service.ts`
- Modify: `apps/movie/src/movie.controller.ts`
- Modify: `apps/api-gateway/src/movie/movie.service.ts`
- Modify: `apps/api-gateway/src/movie/movie.controller.ts`
- Test: `apps/movie/src/movie-read.service.spec.ts`

**Interfaces:**

- Produces: `GET /movie/sitemap` -> `{ movies: Array<{ movieCd: number; updatedAt: string }> }`

- [ ] **Step 1: Write the failing service test**

Prisma가 전체 영화에서 `movieCd`, `updatedAt`만 최신 수정순으로 조회하고 반환하는지 검증한다.

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test -- movie-read.service.spec.ts --runInBand`
Expected: FAIL because `getMovieSitemapEntries` does not exist.

- [ ] **Step 3: Implement the minimal API path**

`GetMovieSitemapEntries` RPC와 경량 응답 메시지를 추가하고 movie-service, API Gateway를 연결한다.

- [ ] **Step 4: Generate protobuf code and verify**

Run: `make generate_grpc_code`
Run: `pnpm exec tsc -p apps/movie/tsconfig.app.json --noEmit --incremental false`
Run: `pnpm exec tsc -p apps/api-gateway/tsconfig.app.json --noEmit --incremental false`

### Task 2: 프론트 검색 신호 정리

**Files:**

- Create: `src/app/robots.test.ts`
- Create: `src/app/site-metadata.test.ts`
- Modify: `src/app/robots.ts`
- Modify: `src/app/site-metadata.ts`
- Modify: `src/config/movie-api-endpoint.ts`
- Modify: `src/app/(root)/(routes)/sitemaps/movies.xml/route.ts`
- Modify: `src/lib/sitemap/sitemap.test.ts`

**Interfaces:**

- Consumes: `GET /movie/sitemap`
- Produces: 공개 채팅 허용 robots 규칙과 전체 영화 URL 사이트맵

- [ ] **Step 1: Write failing tests**

`/chat/public`이 허용되고 `/chat/`은 계속 차단되는지, 존재하지 않는 검색 액션이 제거되는지, 경량 영화 엔트리가 사이트맵 URL로 변환되는지 검증한다.

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm vitest run src/app/robots.test.ts src/app/site-metadata.test.ts src/lib/sitemap/sitemap.test.ts`
Expected: FAIL on the three missing behaviors.

- [ ] **Step 3: Implement the minimal frontend changes**

robots allow 규칙, JSON-LD, 영화 사이트맵 데이터 소스를 수정한다.

- [ ] **Step 4: Verify frontend**

Run: `pnpm vitest run`
Run: `pnpm lint`
Run: `pnpm build`

### Task 3: Release and production verification

**Files:**

- Modify after deployment: `.claude/worklog.md`

- [ ] **Step 1: Check modified file sizes**

Run: `wc -l <all modified source and test files>`
Expected: every non-generated file is at most 200 lines.

- [ ] **Step 2: Merge backend and frontend feature PRs into develop**

PR body includes Summary, 원인, 변경, Test plan.

- [ ] **Step 3: Merge develop release PRs into master and watch Actions**

Expected: backend and frontend deployment workflows complete successfully.

- [ ] **Step 4: Verify production SEO endpoints**

Check `/robots.txt`, `/sitemap.xml`, `/sitemaps/movies.xml`, and `/articles/5` metadata/SSR content.

- [ ] **Step 5: Record deployment**

Append PR numbers, Actions results, and production checks to `.claude/worklog.md`.
