# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

# mg-dynamic-signature

This is a SvelteKit application using the Node adapter.

## Developing

Install dependencies and start the dev server:

```sh
npm install
npm run dev
# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

## Safe and easy deployment on a Hetzner server (Docker + Caddy)

This repo includes a production-ready container setup using Docker Compose and Caddy (automatic HTTPS). It’s a simple and secure way to run the app on a Hetzner VM.

What you get:
- A hardened container image with Chromium support for Puppeteer
- Automatic HTTPS certificates via Let’s Encrypt
- Reverse proxy (Caddy) in front of the app
- Persistent logs under ./log

### 1) Prerequisites on your Hetzner server
- Point your domain (e.g., example.com) A/AAAA records to your server’s public IP
- SSH into your server as a non-root user with sudo
- Install Docker and Docker Compose plugin:
  ```sh
  curl -fsSL https://get.docker.com | sh
  sudo usermod -aG docker $USER
  newgrp docker
  sudo apt-get install -y docker-compose-plugin || true
  ```
- Open firewall for HTTP/HTTPS (if using ufw):
  ```sh
  sudo ufw allow OpenSSH
  sudo ufw allow 80
  sudo ufw allow 443
  sudo ufw enable
  ```

### 2) Configure your domain and environment
- Copy .env.example to .env and adjust values:
  ```sh
  cp .env.example .env
  ```
  Set PORT=3000 (default). If you use AWS/DynamoDB in this project, set credentials as needed.
- Edit Caddyfile and replace:
  - `you@example.com` with your email
  - `example.com` with your domain

### 3) Build and run with Docker Compose
```sh
docker compose build
docker compose up -d
```

- App will run behind Caddy with automatic HTTPS at https://your-domain
- Check logs:
  ```sh
  docker compose logs -f app
  docker compose logs -f caddy
  ```

### 4) Updating the app
```sh
git pull
docker compose build
docker compose up -d
```

### 5) Backups and data
- Application logs are stored in ./log on the host (mounted into the container)
- If you add other writable paths, mount them similarly in docker-compose.yml

### 6) Alternative: systemd (no Docker)
If you prefer running directly on the VM:
- Install Node.js 20+ and Chromium dependencies (for Puppeteer)
- Build and run:
  ```sh
  npm ci
  npm run build
  PORT=3000 npm run start
  ```
- Put Caddy or Nginx in front as a reverse proxy for HTTPS

## Notes
- The app uses @sveltejs/adapter-node and starts with `node build` in production
- The provided Docker image uses ghcr.io/puppeteer/puppeteer to ensure Chromium is available for Puppeteer
- You can customize health checks, resources, and Caddy config as needed
