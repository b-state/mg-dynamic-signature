# Multi-stage build for SvelteKit (adapter-node) with Puppeteer support
# 1) Build stage
FROM node:20-bookworm-slim AS build

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev=false

# Copy rest of the project
COPY . .

# Build the SvelteKit app
RUN npm run build

# 2) Runtime stage using Puppeteer image (Chromium + deps preinstalled)
FROM ghcr.io/puppeteer/puppeteer:24.23.0

# prevent Puppeteer from trying to download browsers in runtime image
ENV NODE_ENV=production \
    PORT=3001 \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium \
    PUPPETEER_SKIP_DOWNLOAD=true

# Create non-root user
USER pptruser
WORKDIR /app

# Copy only needed files
COPY --chown=pptruser:pptruser package.json package-lock.json* ./
RUN npm ci --omit=dev

COPY --from=build --chown=pptruser:pptruser /app/build ./build
COPY --from=build --chown=pptruser:pptruser /app/static ./static
# If you have any runtime assets (e.g., log dir), ensure it exists
RUN mkdir -p /app/log

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT||3001) + '/').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))" || exit 1

CMD ["node", "build"]
