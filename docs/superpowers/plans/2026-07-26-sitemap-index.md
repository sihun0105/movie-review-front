# Sitemap Index Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 50-item sitemap with a dynamic index and paginated child sitemaps that include every public article and match.

**Architecture:** Pure helpers discover page numbers from `hasNext` and map domain entities to sitemap fields. App Router handlers compose those helpers with existing repositories and `next-sitemap` XML response builders.

**Tech Stack:** Next.js 13 App Router, TypeScript, next-sitemap, Vitest

## Global Constraints

- Keep every modified or new handwritten file at 200 lines or fewer.
- Reuse repositories from server route handlers.
- Do not add backend APIs or dependencies.
- Keep `https://bollae.kr/sitemap.xml` as the only sitemap entry in robots.txt.

---

### Task 1: Sitemap helpers

**Files:**
- Create: `src/lib/sitemap/sitemap.ts`
- Test: `src/lib/sitemap/sitemap.test.ts`

**Interfaces:**
- Produces: `discoverSitemapPages(fetchPage)`, field mapping helpers, and child sitemap URL builders.

- [ ] **Step 1: Write failing tests**

Cover multi-page discovery, stop conditions, canonical URLs, and real update
dates.

- [ ] **Step 2: Verify the tests fail**

Run `pnpm exec vitest run src/lib/sitemap/sitemap.test.ts`.

- [ ] **Step 3: Implement the helpers**

Use `SITEMAP_PAGE_SIZE = 100`, follow `hasNext`, and return
`ISitemapField[]` for each domain.

- [ ] **Step 4: Verify the tests pass**

Run `pnpm exec vitest run src/lib/sitemap/sitemap.test.ts`.

### Task 2: Sitemap route handlers

**Files:**
- Modify: `src/app/(root)/(routes)/sitemap.xml/route.ts`
- Create: `src/app/(root)/(routes)/sitemaps/static.xml/route.ts`
- Create: `src/app/(root)/(routes)/sitemaps/movies.xml/route.ts`
- Create: `src/app/(root)/(routes)/sitemaps/articles/[page]/route.ts`
- Create: `src/app/(root)/(routes)/sitemaps/matches/[page]/route.ts`

**Interfaces:**
- Consumes: Task 1 sitemap helpers.
- Produces: sitemap index XML and child sitemap XML responses.

- [ ] **Step 1: Add route contract tests**

Assert the source contracts use `getServerSideSitemapIndex`, page validation,
and paginated repository calls.

- [ ] **Step 2: Verify the route tests fail**

Run the focused sitemap tests.

- [ ] **Step 3: Implement route handlers**

Build the root index from independent page discovery calls and use
`getServerSideSitemap` for child routes.

- [ ] **Step 4: Verify focused tests pass**

Run all sitemap tests.

### Task 3: Verification and delivery

**Files:**
- Modify after deployment: `/Users/gimsihun/Documents/drunkenmovie/.claude/worklog.md`

- [ ] **Step 1: Run automated verification**

Run `pnpm exec vitest run`, `pnpm lint`, and `pnpm build`.

- [ ] **Step 2: Check file size and formatting**

Run `wc -l` on changed source files and `git diff --check`.

- [ ] **Step 3: Commit, create PR, and deploy**

Push the feature branch, merge through the repository's available PR flow, and
wait for the deployment workflow.

- [ ] **Step 4: Verify production XML**

Confirm the root response is a sitemap index and every listed child sitemap
returns valid XML containing expected production URLs.
