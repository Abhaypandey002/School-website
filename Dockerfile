# syntax=docker/dockerfile:1.4

FROM node:18-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* bun.lockb* ./
RUN if [ -f pnpm-lock.yaml ]; then \
      corepack enable pnpm \
      && pnpm install --frozen-lockfile; \
    elif [ -f yarn.lock ]; then \
      corepack enable yarn \
      && yarn install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then \
      npm ci; \
    else \
      npm install; \
    fi

FROM base AS builder
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
RUN npm prune --omit=dev

FROM base AS runner
ENV NODE_ENV=production
RUN addgroup -g 1001 -S nodejs \
    && adduser -S nextjs -u 1001
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/storage ./storage
COPY --from=builder /app/node_modules ./node_modules
RUN mkdir -p storage/csv storage/forms uploads
RUN chown -R nextjs:nodejs storage uploads
USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["npm", "run", "start"]
