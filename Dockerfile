# syntax=docker/dockerfile:1.7

# ─────────────────────────────────────────────
# Stage 1: 의존성 설치 (pnpm store 캐시 활용)
# ─────────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

ENV HUSKY=0 \
    PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm config set store-dir /pnpm/store && \
    pnpm install --frozen-lockfile

# ─────────────────────────────────────────────
# Stage 2: 빌드 (Next.js standalone)
# ─────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

ENV HUSKY=0 \
    NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 클라이언트 번들에 박혀야 하는 NEXT_PUBLIC_* 환경변수
ARG NEXT_PUBLIC_SERVER_API
ARG NEXT_PUBLIC_CHAT_SERVER_API
ENV NEXT_PUBLIC_SERVER_API=${NEXT_PUBLIC_SERVER_API} \
    NEXT_PUBLIC_CHAT_SERVER_API=${NEXT_PUBLIC_CHAT_SERVER_API}

# 빌드 타임 page data 수집 시 assertValue 통과용 placeholder.
# 실제 값은 런타임에 docker-compose env_file로 주입됨 (이미지에 시크릿 박히지 않음).
ARG COOKIE_TOKEN_KEY=build-placeholder
ARG NEXTAUTH_URL=http://localhost:3000
ARG NEXTAUTH_SECRET=build-placeholder
ARG GOOGLE_CLIENT_ID=build-placeholder
ARG GOOGLE_CLIENT_SECRET=build-placeholder
ENV COOKIE_TOKEN_KEY=${COOKIE_TOKEN_KEY} \
    NEXTAUTH_URL=${NEXTAUTH_URL} \
    NEXTAUTH_SECRET=${NEXTAUTH_SECRET} \
    GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID} \
    GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}

RUN pnpm run build

# ─────────────────────────────────────────────
# Stage 3: 실행 (최소 런타임 이미지)
# ─────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# standalone 산출물 복사
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
