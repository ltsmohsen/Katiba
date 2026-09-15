---
type: object
cluster: frontend-packages
universe: live
status: verified
verified: 2026-08-24 @ a8eef5396
---

# Infra runtime & DI (= `@toeverything/infra`, `packages/common/infra`)

**One sentence:** the tiny application framework underneath AFFiNE frontends — Framework/DI container, reactive primitives (LiveData, atoms), and cross-cutting utilities every module composes through.

## Why this shape

With four shells sharing one core, feature modules can't import platform singletons; they receive services through a Framework provider configured differently per platform. Keeping this framework small and in-house (signals-based, no React dependency in the core loop beyond adapters) lets the same business logic run inside workers and native contexts too.

## Shape

- `packages/common/infra/src/framework` — DI container.
- `src/livedata`, `atom` — reactive state primitives.
- `src/op` — worker/RPC operation helpers (used by nbstore worker clients).
- `src/storage`, `orm`, `media`, `app-config-storage.ts` — supporting abstractions.
- Deps confirm intent: `@preact/signals-core`, `jotai`, `eventemitter2`, `fractional-indexing`, `zod`, `yjs` (`packages/common/infra/package.json`).

## Connected to

- consumed-by: every frontend package (`@affine/core`, shells) as `@toeverything/infra`.
- joins: nbstore worker protocol via `op`.
- looks-like-but-is-not: not NestJS (that pattern belongs to the server side); not a state manager for editor content (that's Yjs/BlockSuite).

## If you change this

Hits: literally every frontend module that declares services; worker protocols using `op`.
Does not hit: BlockSuite internals; server code.

## Surfaces

Imported by nearly all frontend packages; rarely touched directly except when evolving the framework itself.

## See

- `packages/common/infra/src/framework`
