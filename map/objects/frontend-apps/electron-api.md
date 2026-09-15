---
type: object
cluster: frontend-apps
universe: live
status: verified
verified: 2026-08-24 @ a8eef5396
---

# Electron IPC contract (= `@affine/electron-api`, `packages/frontend/electron-api`)

**One sentence:** the typed contract layer between Electron main/helper processes and the renderer — one index of shared types and event maps so IPC calls compile-check on both sides.

## Why this shape

Electron IPC is string/event based and otherwise untyped across process boundaries. Keeping handlers' signatures in one tiny package lets main-process handlers (`apps/electron/src/main/handlers.ts`) and preload bridges implement against the same types, turning a missed rename into a build error instead of a runtime silence.

## Shape

- `packages/frontend/electron-api/src/index.ts` — the entire package (single-file contract).

## Connected to

- consumed-by: `objects/frontend-apps/desktop-electron.md` (main/preload/renderer) and `@affine/electron-renderer`.
- looks-like-but-is-not: not an implementation — no runtime logic beyond types/constants lives here.

## If you change this

Hits: every desktop IPC consumer on both sides of the bridge; desktop e2e (`tests/affine-desktop*`).
Does not hit: web/mobile shells; anything without an Electron main process.

## Surfaces

Build-time type source for desktop packages.

## See

- `packages/frontend/electron-api/src/index.ts`
