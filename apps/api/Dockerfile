FROM node:20-alpine AS base
RUN npm install -g pnpm@8.15.0
WORKDIR /app

# ── Dependencies stage ────────────────────────────────────────────────────────
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages ./packages
COPY apps/api/package.json ./apps/api/
RUN pnpm install --frozen-lockfile

# ── Build stage ───────────────────────────────────────────────────────────────
FROM deps AS builder
COPY tsconfig.json ./
COPY packages ./packages
COPY apps/api ./apps/api
RUN pnpm --filter api build

# ── Deploy stage: creates flat node_modules without symlinks ──────────────────
FROM builder AS deploy
RUN pnpm --filter api deploy --prod /app/deploy

# ── Production stage ──────────────────────────────────────────────────────────
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 fastify

COPY --from=deploy --chown=fastify:nodejs /app/deploy/node_modules ./node_modules
COPY --from=builder --chown=fastify:nodejs /app/apps/api/dist ./dist
COPY --from=builder --chown=fastify:nodejs /app/apps/api/package.json ./

USER fastify
EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/health || exit 1

CMD ["node", "dist/index.js"]
