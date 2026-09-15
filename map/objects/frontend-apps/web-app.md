---
type: object
cluster: frontend-apps
universe: live
status: verified
verified: 2026-08-24 @ a8eef5396
---

# Web app (= `@affine/web`, `packages/frontend/apps/web`)

**One sentence:** the browser distribution of AFFiNE — a thin React entry that wires `@affine/core` into a routed SPA plus an nbstore worker.

## Why this shape

All real application logic lives one level down in `@affine/core` so that web, desktop, and mobile can reuse it while differing only in bootstrap: which storage impls get configured (IndexedDB here vs SQLite natively), which native bridges exist, and routing specifics. The web shell exists mostly to choose those platform pieces and start React.

## Shape

- `packages/frontend/apps/web/src/app.tsx` — builds a `Framework` from `@toeverything/infra`, configures common modules, mounts `NbstoreProvider`, sets up router from `@affine/core/desktop/router`, renders `RouterProvider`.
- `packages/frontend/apps/web/src/index.tsx` — DOM mount point.
- `packages/frontend/apps/web/src/nbstore.worker.ts` — spins the shared worker that owns local persistence (imports `@affine/nbstore/worker/consumer`).
- deps confirm the thinness: `@affine/component`, `@affine/core`, `@affine/env`, `@affine/nbstore`, `react 19`, `react-router-dom 6` (`packages/frontend/apps/web/package.json`).

## Connected to

- composed-of: `objects/frontend-packages/core.md` (the actual app), `objects/frontend-packages/nbstore.md` (local storage), `objects/frontend-packages/infra.md` (DI/runtime).
- siblings: desktop wraps this same core via electron-renderer; mobile has its own parallel thin shell `@affine/mobile`.
- looks-like-but-is-not: `app.tsx` looks like "the app" but contains almost no features — features are modules in core.

## If you change this

Hits: browser-only behavior (worker wiring, emotion cache, telemetry transport).
Does not hit: desktop/mobile shells (they have their own app.tsx variants), anything in `@affine/core` internals.

## Surfaces

Served by the cloud server as static files in production; run by rspack dev server (`yarn dev`) locally; read by humans at `packages/frontend/apps/web/src`.

## See

- `packages/frontend/apps/web/src/app.tsx`
