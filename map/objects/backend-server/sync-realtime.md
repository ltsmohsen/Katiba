---
type: object
cluster: backend-server
universe: live
status: verified
verified: 2026-08-24 @ a8eef5396
---

# Sync & realtime gateways (= `core/sync/gateway.ts`, `core/realtime/*`, shared maps in `@affine/realtime`)

**One sentence:** the WebSocket layer of the server — a doc-sync gateway pushing Yjs updates between clients and cloud storage, plus realtime topic/request channels whose message contracts are typed once in the shared `@affine/realtime` package.

## Why this shape

Yjs updates must reach other clients within milliseconds, so they bypass GraphQL and flow over Socket.IO gateways with per-connection auth/version checks (canary client cutoff via `checkCanaryDateClientVersion`). Keeping request/topic names in a shared TS package (`packages/common/realtime/src/index.ts` defines `RealtimeRequestMap` / `RealtimeTopicMap`) makes both ends typecheck against one contract instead of stringly-typed events.

## Shape

- `packages/backend/server/src/core/sync/gateway.ts` — `WebSocketGateway` handling doc sync messages (`SubscribeMessage`, connection/disconnect hooks).
- `packages/backend/server/src/core/realtime/gateway.ts` — realtime requests/topics (copilot delegated editor/tool leases live here too).
- `packages/backend/server/src/core/telemetry/gateway.ts` — telemetry socket.
- `packages/common/realtime/src/index.ts` — the shared typed contract (e.g. `workspace.access.get`, `copilot.delegated.editor.upsert`).

## Connected to

- consumed-by: every online client through nbstore sync engines (`processes/doc-sync.md`).
- joins: doc storage module (`core/doc`) where updates persist; permission service for access checks.
- looks-like-but-is-not: not the GraphQL API — REST/GQL handles CRUD, sockets handle streaming.

## If you change this

Hits: all clients' sync behavior; `@affine/realtime` maps must change in lockstep on both sides.
Does not hit: blob upload path (HTTP/S3); pure-local workspaces that never connect.

## Surfaces

Socket.IO endpoints at runtime; edited under `server/src/core/{sync,realtime}` + `common/realtime`.

## See

- `packages/backend/server/src/core/sync/gateway.ts`
