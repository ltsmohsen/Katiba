---
type: object
cluster: frontend-packages
universe: live
status: verified
verified: 2026-08-24 @ a8eef5396
---

# Application core (= `@affine/core`, `packages/frontend/core`)

**One sentence:** the actual AFFiNE application — every feature module, page, dialog, sidebar, workspace engine, and editor integration shared by all four shells (web, desktop, iOS, Android).

## Why this shape

AFFiNE ships the same product to four platforms, so features must be written once. Core organizes them as self-contained modules under `src/modules/*` (60+ at last count: cloud, collection, comment, db, doc, docs-search, editor-setting, favorite, import, journal, media, navigation, …), wired together at runtime by the DI framework from `@toeverything/infra` rather than hard imports — each shell's entry file decides which implementation variants to configure.

## Shape

- `packages/frontend/core/src/modules/` — feature modules (the bulk of product logic).
- `src/components/`, `src/desktop/`, `src/mobile/` — UI surfaces per form factor; `src/bootstrap/{browser,electron}.ts` — per-platform bootstraps referenced by the shells.
- `src/blocksuite/` — glue between core and BlockSuite editors.
- deps show the layering: `@affine/component`, `@affine/nbstore`, `@affine/reader`, `@affine/graphql`, `@blocksuite/affine`, `@toeverything/infra` (`packages/frontend/core/package.json`).

## Connected to

- owns: navigation/routing composition (`@affine/routes` supplies path constants), workspace flavour configuration.
- consumed-by: all four app shells (`web-app.md`, `desktop-electron.md`, `mobile-apps.md`).
- joins: `@affine/nbstore` for persistence, `@affine/graphql` for server API, BlockSuite for editing.
- looks-like-but-is-not: not a component library (that's `@affine/component`); not the editor engine (that's BlockSuite).

## If you change this

Hits: every platform at once — this is the widest-blast-radius package in the frontend; also e2e suites in `tests/affine-*`.
Does not hit: server modules; BlockSuite internals (unless you change the glue under `src/blocksuite/`).

## Surfaces

Read/written constantly by frontend developers; exercised by vitest unit tests and Playwright e2e.

## See

- `packages/frontend/core/src/modules/index.ts`
