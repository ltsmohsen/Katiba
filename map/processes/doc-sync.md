---
type: process
status: verified
verified: 2026-08-24 @ a8eef5396
consumes:
  - '[[../objects/backend-server/server-core.md]]'
  - '[[../objects/frontend-packages/nbstore.md]]'
produces:
  - a doc state converged across all clients and cloud storage
---

# Doc sync: how an edit travels from one client to the rest

**Input → Output:** local Yjs update in one client → same doc state on every other client (and durable cloud copy).

## Movement

1. User edits; BlockSuite writes into the Yjs doc inside `@blocksuite/store`; updates land in the **local** nbstore first (IndexedDB via worker in browser, SQLite via Rust crate natively). Local-first: no server involved yet. (`objects/frontend-packages/nbstore.md`)
2. Each shell spawns nbstore workers (`packages/frontend/apps/web/src/nbstore.worker.ts`); sync engines attach to the local store.
3. When a cloud workspace is active, the sync engine connects to the server's WebSocket gateway: `packages/backend/server/src/core/sync/gateway.ts` (`@nestjs/websockets` `WebSocketGateway`, connection auth + canary version cutoff at import time).
4. Gateway validates access (permission service) then persists updates through the doc storage module (`server/src/core/doc`) — docs stored as opaque Yjs binaries server-side.
5. Other online clients receive pushed updates over the same socket and apply them to their local stores; BlockSuite reactive layer re-renders.
6. Blobs (images/files) travel separately: HTTP upload to `core/storage` → S3-compatible bucket (`@affine/s3-compat`), referenced by id from doc content.

## If you change this

Hits: `@affine/realtime` message maps, both client sync engines and server gateway together; offline/online merge behavior; `tests/affine-cloud` e2e coverage.
Does not hit: GraphQL CRUD APIs; copilot conversations.

## See

- `packages/backend/server/src/core/sync/gateway.ts`
