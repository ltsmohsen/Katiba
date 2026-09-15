---
type: object
cluster: frontend-packages
universe: live
status: verified
verified: 2026-08-24 @ a8eef5396
---

# nbstore — local-first storage layer (= `@affine/nbstore` TS + `affine_nbstore` Rust)

**One sentence:** the unified local persistence system for docs, blobs, and indexes — a TypeScript package defining connections/sync/storage contracts plus worker plumbing, implemented against IndexedDB (browser) or SQLite (via the Rust crate) on native platforms.

## Why this shape

Local-first means the client owns its data before any server is involved. Storage therefore lives behind an interface ("nbstore") with swappable impls so the identical application code runs on IDB in a browser tab, SQLite in Electron/mobile (fast, transactional), or cloud mode — while a dedicated worker keeps heavy IO off the UI thread. Sync engines then push/pull updates between local stores and the server.

## Shape (TS side)

- `packages/common/nbstore/src/connection`, `impls/` (`broadcast-channel`, `cloud`, `idb`, `sqlite`), `sync/`, `storage/`, `realtime/`, `worker/` — see directory listing.
- Worker consumer wired by each shell: `packages/frontend/apps/web/src/nbstore.worker.ts`.

## Connected to

- implements-against: `objects/native-rust/native-rust.md` (Rust SQLite backend for the `sqlite` impl).
- consumed-by: `objects/frontend-packages/core.md` (modules/storage configures it in every shell).
- joins: `objects/backend-server/server-core.md` sync endpoints over `objects/backend-server/realtime-gateways.md`.
- looks-like-but-is-not: `affine_nbstore` (Rust) is not a separate system — it's the native impl of this layer; also unrelated to the legacy `packages/frontend/native/sqlite_v1` (universe: leftover).

## If you change this

Hits: every platform's data durability; doc-sync movement (`processes/doc-sync.md`); migration story for existing local databases.
Does not hit: server-side Postgres schema; GraphQL API shape.

## Surfaces

Runs in web workers / native threads; edited under `packages/common/nbstore/**` and `packages/frontend/native/nbstore/**`.

## See

- `packages/common/nbstore/src/index.ts`
