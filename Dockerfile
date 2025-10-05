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
FROM ghcr.io/puppeteer/puppeteer:latest

# Set environment variables
ENV NODE_ENV=production \
    PORT=3001

WORKDIR /app

# Copy only needed files and install dependencies as root first
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev


COPY --from=build /app/build ./build
COPY --from=build /app/static ./static

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT||3001) + '/').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))" || exit 1

CMD ["node", "build"]
