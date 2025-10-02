# Multi-stage build for SvelteKit (adapter-node)
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

# 2) Runtime stage
FROM node:20-bookworm-slim

# Install Chromium (needed for Puppeteer)
RUN apt-get update && apt-get install -y \
    chromium \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV NODE_ENV=production \
    PORT=3001 \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium \
    PUPPETEER_SKIP_DOWNLOAD=true

WORKDIR /app

# Copy only needed files and install dependencies as root first
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# Create non-root user and set ownership
RUN groupadd -r appuser && useradd -r -g appuser appuser \
    && mkdir -p /app/log \
    && chown -R appuser:appuser /app

COPY --from=build --chown=appuser:appuser /app/build ./build
COPY --from=build --chown=appuser:appuser /app/static ./static

USER appuser

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT||3001) + '/').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))" || exit 1

CMD ["node", "build"]
