---
type: object
cluster: backend-server
universe: live
status: verified
verified: 2026-08-24 @ a8eef5396
---

# Cloud/self-host server (= `@affine/server`, `packages/backend/server`)

**One sentence:** the NestJS service behind AFFiNE Cloud — accounts/auth, workspaces & permissions, doc sync over WebSocket, blob storage, quotas/features, payments, mail, copilot AI — backed by Postgres (Prisma), Redis, and S3-compatible object storage.

## Why this shape

One deployable serves both AFFiNE Cloud and self-hosted instances (a dedicated `core/selfhost` module handles self-host concerns). The codebase splits into `src/base/*` (infrastructure modules: config, prisma, redis, graphql, logger, metrics, websocket…) and `src/core/*` (domain features: auth, permission, workspaces, sync, storage, quota…), with `src/models/*` as the data-access layer between them. Optional capabilities ship as `plugins/*` so deployments can include only what they configure.

## Shape

- `src/app.module.ts` — root module importing every feature module (imports seen at lines 21–60+).
- `src/base/` — 18 infra modules: cache, config, error, event, graphql, guard, job, logger, metrics, mutex, prisma, redis, storage, throttler, websocket, …
- `src/core/` — domain modules: auth, comment, doc, doc-jobs, doc-renderer, entitlement, features, mail, monitor, notification, permission, queue-dashboard, quota, realtime, selfhost, static-files, storage(+runtime), sync, telemetry, user, version, workspaces, backend-runtime.
- `src/models/` — Prisma-backed data models shared by modules.
- `src/plugins/` — calendar, captcha, copilot, gcloud, indexer, license, oauth, payment, worker.
- `schema.prisma` (at package root) + `src/data/migrations/` (11 migration files, timestamp-named).
- Entry: `src/index.ts` runs CLI (`cli.ts`) or server (`server.ts`) depending on `SERVER_FLAVOR=script`.

## Connected to

- owns: the GraphQL contract mirrored in `objects/frontend-packages/graphql-client.md`; the sync endpoints consumed by `processes/doc-sync.md`.
- joins: Redis (cache/mutex/queues), S3 (blobs), SMTP (mail), payment providers (plugin).
- looks-like-but-is-not: not part of any frontend package; `packages/backend/native` (Rust) is its helper, not a separate service.

## If you change this

Hits: `@affine/graphql` regeneration, all cloud clients, docker compose dev stack (postgres/redis/mailhog per `docs/developing-server.md`), release-cloud workflow.
Does not hit: local-only clients (they run fully without this server).

## Surfaces

HTTP + WebSocket at runtime; operated via `yarn affine server <cmd>`; developed under `packages/backend/server/**`.

## See

- `packages/backend/server/src/app.module.ts`
