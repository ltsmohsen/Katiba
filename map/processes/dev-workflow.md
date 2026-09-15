---
type: process
status: verified
verified: 2026-08-24 @ a8eef5396
consumes:
  - '[[../objects/frontend-packages/core.md]]'
  - '[[../objects/frontend-packages/nbstore.md]]'
  - '[[../objects/backend-server/server-core.md]]'
produces:
  - running dev environment (web app on :8080, server API, dockerized postgres/redis/mailhog)
---

# Dev workflow: from clean clone to running product

**Input → Output:** a fresh clone → local dev stack with web frontend and/or cloud server.

## Movement

1. Install Node.js 22 LTS and enable Yarn 4 via Corepack (pinned by root `package.json`: `packageManager: yarn@4.18.0`, engines `node >=22.12 <23`). `docs/BUILDING.md:56-66`.
2. `yarn install` at repo root — workspaces resolve (`package.json` workspaces: `blocksuite/**/*`, `packages/*/*`, `apps`, `tools/*`, `tests/*`); postinstall runs `yarn affine init` + husky hooks (`docs/BUILDING.md:101-104`).
3. Build Rust natives when touching desktop/mobile/server-native paths: `yarn affine @affine/native build`, and `yarn affine @affine/server-native build` for the server. Requires rustup toolchain pinned by `rust-toolchain.toml`. `docs/BUILDING.md:111-121`, `docs/developing-server.md:31`.
4. Frontend only: `yarn dev` (= `yarn affine dev`) — the CLI in `tools/cli/src/dev.ts` asks which distribution (web / electron / ios…) then starts rspack on :8080.
5. Cloud server additionally needs services: `cp ./.docker/dev/compose.yml.example … && docker compose -f ./.docker/dev/compose.yml up` brings up postgres (pgvector image), redis, mailhog. `docs/developing-server.md:8-22`.
6. Configure server env: `cp packages/backend/server/.env.example packages/backend/server/.env`; init DB: `yarn affine server init` (runs prisma migrate + data-migration script; see `packages/backend/server/package.json` scripts `init`, `data-migration`).
7. Start server: `yarn affine server dev` (nodemon on `src/index.ts`). Dev seeds users: `dev@affine.pro/dev`, `pro@affine.pro/pro`, `team@affine.pro/team`. `docs/developing-server.md:44-77`.
8. Verify: open http://localhost:8080, log in with the seeded user.

## If you change this

Hits: onboarding docs (`docs/BUILDING.md`, `docs/developing-server.md`), CI setup jobs in `.github/workflows/build-test.yml`.
Does not hit: release packaging (separate movement, `build-release.md`).

## See

- `tools/cli/src/affine.ts` and `tools/cli/src/dev.ts` — what `yarn affine <target> <cmd>` actually dispatches to.
