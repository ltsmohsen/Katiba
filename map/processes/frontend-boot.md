---
type: process
status: verified
verified: 2026-08-24 @ a8eef5396
consumes:
  - '[[../objects/frontend-packages/core.md]]'
produces:
  - booted application shell with workspace loaded in the editor
---

# Frontend boot: from index.html to an open doc

**Input → Output:** browser tab (or Electron renderer) launch → routed AFFiNE UI with a workspace/doc rendered.

## Movement

1. Shell entry runs its bootstrap: `packages/frontend/core/src/bootstrap/browser.ts` (polyfills, env, telemetry, public-path) — Electron/mobile have their own variants.
2. `apps/web/src/app.tsx` constructs the DI `Framework` from `@toeverything/infra` and calls `configureCommonModules` (`@affine/core/modules`) — registering every feature module's services.
3. Platform-specific impls get configured: storage flavour (`configureLocalStorageStateStorageImpls`, nbstore impls), workbench variant, workspace flavours (`configureBrowserWorkspaceFlavours`) — this is where the same core becomes "web" vs "desktop".
4. `NbstoreProvider` + `StoreManagerClient` start the persistence worker (`nbstore.worker.ts`); worker owns IDB/SQLite access off-thread.
5. Router from `@affine/core/desktop/router` mounts via react-router-dom; path constants come from `@affine/routes` (`ROUTES` tree).
6. `LifecycleService` (`core/modules/lifecycle`) gates phases until ready; workspace engine opens the last/current workspace; BlockSuite editor mounts the doc; sync engines attach (→ `doc-sync.md`).

## If you change this

Hits: all four shells (shared configure functions), cold-start performance, e2e suites that assume boot order.
Does not hit: server boot (`server-boot.md`); native crate loading beyond what step 4 consumes.

## See

- `packages/frontend/apps/web/src/app.tsx`
