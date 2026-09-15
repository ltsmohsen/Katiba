---
type: object
cluster: frontend-apps
universe: live
status: verified
verified: 2026-08-24 @ a8eef5396
---

# Mobile apps (= `@affine/mobile`, Capacitor iOS shell, Android project)

**One sentence:** the mobile distributions — a React shell (`packages/frontend/apps/mobile`) over `@affine/core`, wrapped by Capacitor on iOS (`packages/frontend/apps/ios`) and a native Android project (`packages/frontend/apps/android`).

## Why this shape

Same reuse strategy as desktop: one application core, per-platform thin shells that differ only in bootstrap and native bridges. iOS uses Capacitor to embed the built web assets in a native container (per its own AGENTS.md: "hybrid mobile app that wraps a React web application in a native iOS shell"), with codegen producing GraphQL and Rust bindings.

## Shape

- `packages/frontend/apps/mobile/src/{app.tsx,index.tsx,nbstore.worker.ts}` — parallel structure to the web shell; deps mirror it (`@affine/component`, `@affine/core`, `react-router-dom`…).
- `packages/frontend/apps/ios/` — Capacitor config + Xcode workspace; `AGENTS.md` documents build commands and live-reload setup.
- `packages/frontend/apps/android/` — Android counterpart.
- `packages/frontend/apps/mobile-shared` — code shared between the two mobile shells.
- `packages/frontend/mobile-native` — Rust crate for mobile-side native bits (workspace member of root `Cargo.toml`).

## Connected to

- composed-of: `objects/frontend-packages/core.md`, `objects/native-rust/native-rust.md`.
- looks-like-but-is-not: not a separate product — feature work almost always lands in core first.

## If you change this

Hits: mobile release workflow (`.github/workflows/release-mobile.yml`), Capacitor sync steps, mobile-native crate ABI if bridges change.
Does not hit: desktop packaging; web-only routing.

## Surfaces

iOS App Store / Android distribution channels via CI; developers via `yarn affine @affine/ios …` commands.

## See

- `packages/frontend/apps/ios/AGENTS.md`
