---
type: object
cluster: frontend-apps
universe: live
status: verified
verified: 2026-08-24 @ a8eef5396
---

# Desktop app (= `@affine/electron` + `@affine/electron-renderer`, `packages/frontend/apps/electron*`)

**One sentence:** the Windows/macOS/Linux distribution — an Electron app (main + helper processes, packaged with electron-forge/electron-builder) wrapping the same `@affine/core` renderer used on web, talking to it over RPC and using the Rust SQLite layer for local storage.

## Why this shape

Desktop needs OS integration the browser can't provide: file protocol handling, tray/menu, auto-update, find-in-page, secure external-link handling, and native SQLite via `affine_native`. These live in main-process modules; the renderer reuses the web application almost unchanged (`electron-renderer` deps are the web shell's set plus `@affine/electron-api` bridge). Upstream docs state the dependency order explicitly: core → native (Rust/sqlite) → electron app (`docs/building-desktop-client-app.md:15-19`).

## Shape

- `apps/electron/src/main/` — main process: `protocol.ts`, `deep-link.ts`, `handlers.ts`, `helper-process.ts`, `tray/`, `application-menu/`, `auth/`, `clipboard/`, `find-in-page/`, `import/`, `recording/`, `security-restrictions.ts`, `byok-storage/`, `shared-storage`.
- `src/helper/`, `src/preload/`, `src/shared/` — helper process, context bridge, shared types.
- Packaging: electron-forge ^7.11.1 + app-builder-lib ^26.15.0 in `package.json` devDeps; two-pass yarn hoisting workaround documented upstream.
- `apps/electron-renderer` — renderer entry around `@affine/core`.

## Connected to

- wraps: `objects/frontend-apps/web-app.md`'s sibling core (`objects/frontend-packages/core.md`).
- loads: `objects/native-rust/native-rust.md` (SQLite/blob engine in main/helper process).
- looks-like-but-is-not: `electron-api` is just the typed IPC contract, not the app.

## If you change this

Hits: desktop release workflow (`.github/workflows/release-desktop*.yml`), updater channels (BUILD_TYPE canary/beta/stable), preload security model.
Does not hit: web shell (no Electron APIs there); server.

## Surfaces

Shipped installers per platform; developers run `yarn affine @affine/electron dev`.

## See

- `docs/building-desktop-client-app.md`
