FROM node:20-alpine AS base

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate

# Set working directory
WORKDIR /app

# ── Dependencies stage ────────────────────────────────────────────────────────
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages ./packages
COPY apps/web/package.json ./apps/web/

# Install all dependencies
RUN pnpm install --frozen-lockfile

# ── Build stage ───────────────────────────────────────────────────────────────
FROM deps AS builder
COPY packages ./packages
COPY apps/web ./apps/web

RUN pnpm --filter web build

# ── Production stage ──────────────────────────────────────────────────────────
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built artifacts
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/package.json ./

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]