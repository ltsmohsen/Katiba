---
type: process
status: verified
verified: 2026-08-24 @ a8eef5396
consumes:
  - '[[../objects/frontend-apps/desktop-electron.md]]'
  - '[[../objects/frontend-apps/mobile-apps.md]]'
  - '[[../objects/native-rust/native-rust.md]]'
produces:
  - signed installers / store artifacts per platform via GitHub Actions
---

# Build & release pipeline

**Input → Output:** a commit on canary → published artifacts (cloud image, desktop installers, mobile builds).

## Movement

1. CI workflows live in `.github/workflows/`: `build-test.yml` (PR checks), `release-cloud.yml`, `release-desktop.yml` + `release-desktop-platform.yml`, `release-mobile.yml`, `build-images.yml`, plus housekeeping (pr-title-lint, auto-labeler).
2. Desktop order is documented and load-bearing — core → Rust natives → electron packaging, twice over due to a yarn hoisting limitation (two separate yarn installs): `docs/building-desktop-client-app.md:15-19,44+`.
3. Native crates build first (`yarn affine @affine/native build`), then core assets (`BUILD_TYPE=canary yarn affine @affine/electron build && … generate-assets`), then electron-forge/electron-builder produce installers.
4. Mobile: web assets built with `BUILD_TYPE=canary PUBLIC_PATH=/ yarn affine @affine/ios build`, then Capacitor sync, then Xcode/Gradle builds (see `packages/frontend/apps/ios/AGENTS.md`).
5. Cloud: server docker images built by `build-images.yml`/`release-cloud.yml`; frontend static assets served from the same image (`core/static-files`).
6. Channels: BUILD_TYPE canary/beta/stable selects distribution channel; version 0.27.0 at root.

## If you change this

Hits: release timing for every platform; contributors' local builds if scripts move.
Does not hit: app runtime behavior (except through bundled assets).

## See

- `.github/workflows/release-desktop.yml`
