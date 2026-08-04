# Account Activity Lists Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 마이페이지 활동 숫자를 한 줄 탐색으로 바꾸고 각 활동의 상세 목록과 삭제 기능을 제공한다.

**Architecture:** API Gateway의 `UserActivityService`가 Prisma로 인증 사용자의 활동 목록을 페이지 조회하고 평점을 soft delete한다. Next BFF와 `user-activity` 파사드가 이를 전달하며, 계정 화면은 선택한 타입만 지연 로딩한다.

**Tech Stack:** NestJS 10, Prisma 5, Next.js 13 App Router, SWR, React, Vitest, Jest, TailwindCSS

## Global Constraints

- 모든 수동 작성 파일은 200줄 이하로 유지한다.
- 브라우저 요청은 Next BFF를 경유하고 인증 토큰은 서버에서만 전달한다.
- 삭제는 확인 후 수행하며 성공 시 요약 숫자와 목록을 함께 갱신한다.

---

### Task 1: Backend activity list queries

**Files:**

- Modify: `apps/api-gateway/src/user/user-activity.service.ts`
- Modify: `apps/api-gateway/src/user/user.controller.ts`
- Test: `apps/api-gateway/src/user/user-activity.service.spec.ts`

**Interfaces:**

- Produces: `getActivity(userId, type, page, pageSize)` and `deleteRating(userId, movieCd)`.

- [ ] Add failing Jest cases for four list types, active-data filters, pagination, and rating deletion.
- [ ] Run the focused Jest suite and confirm the new cases fail because methods are missing.
- [ ] Implement explicit list mappers and guarded controller routes.
- [ ] Run the focused Jest suite and confirm it passes.

### Task 2: Rating soft-delete consistency

**Files:**

- Modify: `apps/movie/src/movie-score.service.ts`
- Test: `apps/movie/src/movie-score.service.spec.ts`

**Interfaces:**

- Consumes: existing `upsertMovieScore`, `getMovieScore`, `getAverageMovieScore` methods.
- Produces: active-only reads and reactivation on upsert.

- [ ] Add failing tests proving deleted ratings are excluded and a new score revives the record.
- [ ] Run the focused Jest suite and verify RED.
- [ ] Add `deletedAt: null` filters and reset on upsert.
- [ ] Run the focused Jest suite and verify GREEN.

### Task 3: Frontend activity data layer and BFF

**Files:**

- Modify: `src/modules/user-activity/*`
- Create: `src/app/api/user/activity/[type]/route.ts`
- Create: `src/app/api/user/activity/ratings/[movieCd]/route.ts`
- Test: route tests beside each route.

**Interfaces:**

- Produces: `getActivity(type, page)`, `deleteRating(movieCd)`, activity item unions and paginated response.

- [ ] Add failing route and datasource tests for token forwarding, query forwarding, and delete.
- [ ] Run focused Vitest tests and verify RED.
- [ ] Implement endpoint constants, BFF routes, datasource, and repository methods.
- [ ] Run focused Vitest tests and verify GREEN.

### Task 4: Account one-line navigation and lists

**Files:**

- Modify: `src/app/(root)/account/sections/community-summary-section.tsx`
- Create: focused components and hooks under `src/app/(root)/account/components/activity/` and `hooks/`.
- Modify: `src/app/(root)/account/account-community-summary.test.ts`

**Interfaces:**

- Consumes: `UserActivityRepository` list/delete methods and existing article delete BFF routes.
- Produces: four-column navigation, lazy lists, navigation links, confirm-delete behavior.

- [ ] Add failing UI contract tests for the one-line layout, absent heading, list content, and delete controls.
- [ ] Run focused Vitest tests and verify RED.
- [ ] Implement small list/navigation components and SWR state management.
- [ ] Run focused Vitest tests and verify GREEN.

### Task 5: Verification and delivery

**Files:**

- Modify: `.claude/worklog.md` after production deployment.

- [ ] Run all focused backend and frontend tests.
- [ ] Run frontend lint/build and backend target builds.
- [ ] Check every modified/new source file with `wc -l` and run `git diff --check`.
- [ ] Commit each repository, create and merge PRs, watch deployment actions, and verify production routes and account UI.
