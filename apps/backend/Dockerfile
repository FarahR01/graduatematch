# ================================
# Stage 1: Dependencies
# ================================
FROM node:22.14.0-alpine3.21 AS deps

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

WORKDIR /app

# Copy package files for dependency installation
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/backend/package.json ./apps/backend/
COPY packages/shared/package.json ./packages/shared/
COPY packages/typescript-config/package.json ./packages/typescript-config/

# Install all dependencies (needed for build)
RUN pnpm install --frozen-lockfile

# ================================
# Stage 2: Builder
# ================================
FROM node:22.14.0-alpine3.21 AS builder

RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/pnpm-lock.yaml ./

# Copy source code
COPY apps/backend ./apps/backend
COPY packages ./packages
COPY package.json pnpm-workspace.yaml tsconfig.json ./

# Re-install to properly link workspace packages (pnpm needs this for workspace symlinks)
RUN pnpm install --frozen-lockfile

# Build the application
RUN pnpm --filter @graduatematch/backend build

# ================================
# Stage 3: Production
# ================================
FROM node:22.14.0-alpine3.21 AS production

# Security: Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 -G nodejs -D -s /sbin/nologin nestjs

WORKDIR /app

# Install pnpm for production
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

# Copy package files
COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=builder /app/apps/backend/package.json ./apps/backend/

# Install production dependencies only and clean cache
RUN pnpm install --frozen-lockfile --prod --ignore-scripts \
    && pnpm store prune \
    && rm -rf /root/.local/share/pnpm/store

# Copy built application
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist

# Set ownership to non-root user
RUN chown -R nestjs:nodejs /app

# Switch to non-root user
USER nestjs

# Environment configuration
ENV NODE_ENV=production
ENV PORT=3001

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3001/api/health || exit 1

# Start the application
CMD ["node", "apps/backend/dist/main.js"]