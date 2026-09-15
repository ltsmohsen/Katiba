---
type: object
cluster: native-rust
universe: live
status: verified
verified: 2026-08-24 @ a8eef5396
---

# Rust native crates (= `affine_native`, `affine_nbstore`, `affine_common`, `mobile_native`, `server-native`, exposed to JS via napi-rs)

**One sentence:** five Cargo crates compiled to Node/native addons (napi) that give every platform fast, native implementations where JS is too slow or unavailable — SQLite doc/blob/index storage, HTML sanitizing, doc loading/previews, hashcash, image handling.

## Why this shape

Local-first performance workloads (SQLite transactions over thousands of blocks, full-text indexing, thumbnailing) need native speed and threads, and mobile/desktop packaging needs single-file addons. napi-rs lets each crate export typed functions directly into Node/Electron/mobile runtimes; the workspace keeps them versioned together (root `Cargo.toml` members list, edition 2024, resolver 3).

## Shape

Workspace members (root `Cargo.toml`):

- `packages/frontend/native` → `affine_native`: media capture dir, sqlite bindings glue, misc desktop helpers.
- `packages/frontend/native/nbstore` → `affine_nbstore`: the real storage engine — `src/{storage.rs,doc.rs,blob.rs,indexer/,pool.rs,doc_sync.rs,blob_sync.rs}`.
- `packages/frontend/native/schema` + `sqlite_v1` (universe: leftover) — current schema crate and the legacy v1 DB.
- `packages/common/native` → `affine_common`: shared utils (hashcash feature flag).
- `packages/backend/native` → `@affine/server-native`: server helpers — `src/{html_sanitize.rs,content_policy.rs,doc_loader.rs,hashcash.rs,image.rs,auth_session.rs,…}`, exported through napi with `index.d.ts`.
- `packages/frontend/mobile-native` → mobile counterpart.

## Connected to

- implements-for: `objects/frontend-packages/nbstore.md` (TS↔Rust split of one system).
- consumed-by: Electron main process, mobile shells, server (`@affine/server-native` imports in server code).
- looks-like-but-is-not: not microservices — they load in-process as `.node` addons.

## If you change this

Hits: requires Rust toolchain rebuild (`yarn affine @affine/native build` / `@affine/server-native build`); ABI changes ripple to `index.d.ts` consumers; local DB migrations if schema crate changes.
Does not hit: pure-JS packages' logic; Postgres schema.

## Surfaces

Loaded at runtime by Node/Electron/mobile; built by CI (release-desktop/mobile workflows) and locally via `yarn affine` commands.

## See

- `Cargo.toml` (root workspace members)
- `packages/backend/native/index.d.ts`
