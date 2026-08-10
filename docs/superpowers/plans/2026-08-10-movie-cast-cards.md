# Movie Cast Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Add cached leading-cast data and portrait cards to every movie detail page.

**Architecture:** The movie service owns TMDB credit enrichment and persistence. The existing detail response carries a bounded actors array so the frontend only maps and renders server-provided data.

**Tech Stack:** NestJS 10, Prisma MySQL, gRPC, Next.js 13, React, Tailwind CSS, Jest, Vitest

## Global Constraints

- Return at most eight actors.
- Hide the UI for empty results and do not fail movie detail on enrichment errors.
- Keep every manually maintained file at 200 lines or fewer.

---

### Task 1: Persist and expose movie cast

**Files:**
- Modify: prisma/mysql.schema.prisma
- Create: prisma/migrations/20260810000000_add_movie_actors/migration.sql
- Modify: proto/movie.proto
- Modify: libs/common/src/protobuf/movie.ts
- Modify: apps/movie/src/movie-metadata.client.ts
- Create: apps/movie/src/movie-cast.service.ts
- Create: apps/movie/src/movie-cast.service.spec.ts
- Modify: apps/movie/src/movie-read.service.ts
- Modify: apps/movie/src/movie.module.ts
- Modify: apps/movie/src/movie.formatter.ts

**Interfaces:**
- Produces: MovieActorData and MovieData.actors with id, name, character, profileUrl, and sortOrder

- [ ] **Step 1: Write failing cast service and formatter tests**
- [ ] **Step 2: Run Jest and confirm missing cast behavior fails**
- [ ] **Step 3: Add schema, migration, TMDB mapping, and resilient cache service**
- [ ] **Step 4: Generate protobuf and Prisma clients, then run Jest and TypeScript**
- [ ] **Step 5: Check file sizes and commit**

### Task 2: Render cast portrait cards

**Files:**
- Modify: src/modules/movie/movie.entity.ts
- Modify: src/modules/movie/movie-datasource.ts
- Create: src/app/(root)/(routes)/movie/[id]/sections/movie-cast-section.tsx
- Create: src/app/(root)/(routes)/movie/[id]/sections/movie-cast-section.test.ts
- Modify: src/app/(root)/(routes)/movie/[id]/sections/description-section.tsx

**Interfaces:**
- Consumes: Movie.actors
- Produces: bounded horizontal leading-cast section

- [ ] **Step 1: Write failing entity and UI source contracts**
- [ ] **Step 2: Run Vitest and confirm RED**
- [ ] **Step 3: Map actors and implement the responsive card section**
- [ ] **Step 4: Run Vitest, lint, and production build**
- [ ] **Step 5: Check file sizes and commit**
