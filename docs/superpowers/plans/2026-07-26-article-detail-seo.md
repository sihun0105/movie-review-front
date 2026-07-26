# Article Detail SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give every public article detail page unique, self-referencing search metadata and `BlogPosting` structured data.

**Architecture:** Keep article retrieval in the existing server repository and add pure SEO builders next to the detail route. The page uses a React-cached lookup for both `generateMetadata` and rendering, then embeds escaped JSON-LD scripts with the visible article.

**Tech Stack:** Next.js 13 App Router, TypeScript, React server components, Vitest

## Global Constraints

- Keep every hand-written file at or below 200 lines.
- Do not add a dependency for Markdown text extraction.
- Keep article pages public and indexable.
- Use `https://bollae.kr/articles/{id}` as the only canonical detail URL.
- Preserve the existing not-found behavior.

---

### Task 1: Pure article SEO builders

**Files:**
- Create: `src/app/(root)/(routes)/articles/[id]/seo.ts`
- Create: `src/app/(root)/(routes)/articles/[id]/seo.test.ts`

**Interfaces:**
- Consumes: `Article` from `@/lib/type`
- Produces: `buildArticleMetadata(article: Article): Metadata`, `buildArticleJsonLd(article: Article): object[]`, and `serializeJsonLd(value: object): string`

- [ ] **Step 1: Write failing metadata and JSON-LD tests**

Use an article containing Markdown formatting, a link, and an image. Assert:

```ts
expect(metadata.title).toBe('그랜드 부다페스트 호텔 후기 | 볼래')
expect(metadata.alternates?.canonical).toBe(
  'https://bollae.kr/articles/5',
)
expect(metadata.openGraph?.url).toBe('https://bollae.kr/articles/5')
expect(metadata.description).not.toContain('![')
expect(jsonLd[0]).toMatchObject({
  '@type': 'BlogPosting',
  headline: '그랜드 부다페스트 호텔 후기',
})
```

- [ ] **Step 2: Run the test and verify RED**

Run:

```bash
pnpm exec vitest run 'src/app/(root)/(routes)/articles/[id]/seo.test.ts'
```

Expected: FAIL because `./seo` does not exist.

- [ ] **Step 3: Implement the pure builders**

Implement:

```ts
export function buildArticleMetadata(article: Article): Metadata
export function buildArticleJsonLd(article: Article): object[]
export function serializeJsonLd(value: object): string
```

The description removes Markdown images, links, formatting marks, HTML tags, and repeated whitespace, then limits output to 160 characters. Social metadata uses the first Markdown image or `/images/og-image.png`.

- [ ] **Step 4: Run the test and verify GREEN**

Run the focused Vitest command from Step 2. Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/app/\(root\)/\(routes\)/articles/\[id\]/seo.ts \
  src/app/\(root\)/\(routes\)/articles/\[id\]/seo.test.ts
git commit -m "✨ 아티클 상세 SEO 빌더 추가"
```

### Task 2: Detail route integration

**Files:**
- Modify: `src/app/(root)/(routes)/articles/[id]/page.tsx`
- Create: `src/app/(root)/(routes)/articles/[id]/page-seo.test.ts`

**Interfaces:**
- Consumes: the three SEO builder exports from Task 1
- Produces: Next.js `generateMetadata` and two JSON-LD script elements

- [ ] **Step 1: Write a failing integration contract test**

Assert the page source contains:

```ts
expect(source).toContain('export async function generateMetadata')
expect(source).toContain('application/ld+json')
expect(source).toContain('buildArticleJsonLd')
```

- [ ] **Step 2: Run the integration test and verify RED**

Run:

```bash
pnpm exec vitest run 'src/app/(root)/(routes)/articles/[id]/page-seo.test.ts'
```

Expected: FAIL because the page does not export dynamic metadata or JSON-LD.

- [ ] **Step 3: Integrate metadata and JSON-LD**

Wrap the repository lookup with React `cache()`. Export `generateMetadata`, keep
`notFound()` for missing article rendering, and render both `BlogPosting` and
`BreadcrumbList` objects through escaped JSON-LD script elements.

- [ ] **Step 4: Run all article SEO tests**

```bash
pnpm exec vitest run \
  'src/app/(root)/(routes)/articles/[id]/seo.test.ts' \
  'src/app/(root)/(routes)/articles/[id]/page-seo.test.ts'
```

Expected: all tests pass.

- [ ] **Step 5: Run project verification**

```bash
pnpm lint
COOKIE_TOKEN_KEY=test-cookie-token-key \
NEXTAUTH_SECRET=test \
GOOGLE_CLIENT_ID=test \
GOOGLE_CLIENT_SECRET=test \
pnpm build
wc -l src/app/\(root\)/\(routes\)/articles/\[id\]/{page.tsx,seo.ts,seo.test.ts,page-seo.test.ts}
git diff --check
```

Expected: tests, lint, and build exit 0; all listed files are at most 200 lines.

- [ ] **Step 6: Commit**

```bash
git add src/app/\(root\)/\(routes\)/articles/\[id\]/page.tsx \
  src/app/\(root\)/\(routes\)/articles/\[id\]/page-seo.test.ts
git commit -m "✨ 아티클 상세 동적 SEO 적용"
```

### Task 3: PR, deployment, and production verification

**Files:**
- Modify after deployment: `/Users/gimsihun/Documents/drunkenmovie/.claude/worklog.md`

**Interfaces:**
- Consumes: feature branch commits from Tasks 1 and 2
- Produces: merged PR, successful deployment run, verified production HTML

- [ ] **Step 1: Push and create the PR**

Push `feature/article-dynamic-seo` and create a PR targeting `master` because the remote has no `develop` branch. Include Summary, 원인, 변경, and Test plan sections.

- [ ] **Step 2: Merge and watch deployment**

Merge the PR, then watch `Deploy Frontend to Production` until it exits successfully.

- [ ] **Step 3: Verify production HTML**

Fetch `https://bollae.kr/articles/5` and assert:

```text
title = 그랜드 부다페스트 호텔 후기 | 볼래
canonical = https://bollae.kr/articles/5
og:url = https://bollae.kr/articles/5
JSON-LD @type = BlogPosting
```

- [ ] **Step 4: Record the deployment**

Prepend a worklog entry with the PR, Actions run, production checks, and the Search Console indexing request that remains for the operator.
