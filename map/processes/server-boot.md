---
type: process
status: verified
verified: 2026-08-24 @ a8eef5396
consumes:
  - '[[../objects/backend-server/server-core.md]]'
  - '[[../objects/backend-server/copilot-plugin.md]]'
produces:
  - initialized NestJS app with base infra + core modules + enabled plugins
---

# Server boot: what happens when @affine/server starts

**Input → Output:** process start (`src/index.ts`) → listening HTTP + WebSocket server with DI graph assembled.

## Movement

1. `src/index.ts` checks `env.flavors.script`: script flavor → `runCli()` (`src/cli.ts`, e.g. `yarn affine server prisma studio`, seed, data-migration); otherwise `runServer()` (`src/server.ts`).
2. `src/prelude.ts` loads env/config first (`src/env.ts` defines `Env`, `ServerRole`, flavors).
3. `AppModule` (`src/app.module.ts`) composes, in order: ClsModule (request context, transactional Prisma adapter) → `base/*` infrastructure (Config, Logger, Prisma, Redis, Cache, Event, Gql, Error, Metrics, Mutex, Job, Throttler, WebSocket, Scanner, Helpers) → `models` (data access) → `core/*` domain modules (auth, permission, workspaces, doc, storage, sync, realtime, quota, features, mail, notification, selfhost, …) → backend-runtime producer/worker modules → `plugins/*` conditionally by config (copilot, payment, oauth, indexer, captcha, calendar, gcloud, license, worker).
4. NestJS instantiates the graph: Prisma connects to Postgres (`schema.prisma` at package root), Redis connects for cache/mutex/queues, Socket.IO gateways attach (sync, realtime, telemetry).
5. Static frontend assets are served when present (`core/static-files`) — this is how self-host serves the web app.
6. Readiness verified externally by hitting the server; dev seeds exist after init (`dev-workflow.md` step 7).

## If you change this

Hits: every deployment flavor (cloud + self-host); plugin wiring conditions; `docs/developing-server.md`.
Does not hit: client bootstrap paths (separate movement below); native crates.

## See

- `packages/backend/server/src/app.module.ts`
