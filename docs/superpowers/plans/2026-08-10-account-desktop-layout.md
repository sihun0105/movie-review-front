# Account Desktop Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Keep the account page centered in the desktop content pane without a nested side rail.

**Architecture:** Recompose the existing account sections in a single min-width-safe column. Reuse every existing section and change only responsive layout classes.

**Tech Stack:** Next.js 13, React, Tailwind CSS, Vitest

## Global Constraints

- Keep every modified file at 200 lines or fewer.
- Preserve existing account actions and mobile ordering.

---

### Task 1: Remove the nested account rail

**Files:**
- Modify: src/app/(root)/account/account-community-summary.test.ts
- Modify: src/app/(root)/account/page.tsx
- Modify: src/app/(root)/account/sections/profile-section.tsx
- Modify: src/app/(root)/account/sections/account-section.tsx

**Interfaces:**
- Consumes: existing ProfileSection, CommunitySummarySection, and AccountSection
- Produces: a single-column account workspace with no desktop horizontal overflow

- [ ] **Step 1: Write a failing source contract**

Assert that the page no longer contains the nested 200px desktop grid and that
profile/account sections remain horizontal and full-width on desktop.

- [ ] **Step 2: Run the focused test and confirm RED**

Run the account community summary Vitest file.

- [ ] **Step 3: Implement the layout**

Use a min-width-safe full-width column, remove desktop vertical profile classes,
and keep account action groups inside the center pane width.

- [ ] **Step 4: Verify GREEN and build**

Run the focused test, lint, and production build.

- [ ] **Step 5: Check file sizes and commit**

Run wc -l on every modified file and commit the feature branch.
