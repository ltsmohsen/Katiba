# AFFiNE System Map — start here

System map of the AFFiNE monorepo at `~/Projects/Katiba/AFFiNE`, commit `a8eef5396` (branch `canary`), mapped 2026-08-24.

AFFiNE is a privacy-focused, local-first alternative to Notion + Miro: documents, a whiteboard (edgeless canvas), and structured databases merged in one editor, with an optional cloud service for sync, collaboration, and AI (copilot).

Read order: this file → `objects/_index.md` (all nouns, one line each) → the one card you need → `effects/CONTEXT.md` before planning any change.

## Shelves

| Path                         | Holds                                                                       |
| ---------------------------- | --------------------------------------------------------------------------- |
| `objects/editor-blocksuite/` | The editor engine: BlockSuite framework + AFFiNE blocks/canvas              |
| `objects/frontend-apps/`     | Shipping apps: web, desktop (Electron), mobile/iOS/Android                  |
| `objects/frontend-packages/` | Shared frontend libraries the apps are composed from                        |
| `objects/backend-server/`    | Cloud/self-host server (`@affine/server`: NestJS + Prisma + Postgres)       |
| `objects/native-rust/`       | Rust crates exposed to JS (SQLite storage, sanitizers, loaders)             |
| `objects/tests/`             | E2E suites + shared kit — executable specification of user-visible behavior |
| `objects/tools/`             | Repo infrastructure: `yarn affine` CLI dispatcher + maintenance tools       |
| `processes/`                 | Repeatable movements: dev setup, boot, doc sync, API, migrations, releases  |
| `effects/`                   | Change-impact index: "if you change X, open these cards"                    |

## Routing

| You want to…                              | Open                                                                                               |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Understand how docs are stored and synced | `processes/doc-sync.md`, then `objects/frontend-packages/nbstore.md`                               |
| Add a server feature or module            | `objects/backend-server/server-core.md`, `processes/server-boot.md`, `processes/migration-flow.md` |
| Work on editor UI / document blocks       | `objects/editor-blocksuite/affine-blocks.md`                                                       |
| Change the editor engine itself           | `objects/editor-blocksuite/blocksuite-framework.md`                                                |
| Build/package desktop or mobile           | `objects/frontend-apps/desktop-electron.md` (or `mobile-apps.md`) + `processes/build-release.md`   |
| Set up a dev environment from scratch     | `processes/dev-workflow.md`                                                                        |
| Call the cloud API from the frontend      | `objects/frontend-packages/graphql-client.md`                                                      |
| Read or extend e2e tests                  | `objects/tests/test-suites.md`                                                                     |
| Change build/dev commands or repo scripts | `objects/tools/dev-tooling.md`                                                                     |
| Know what a planned change will hit       | `effects/CONTEXT.md`                                                                               |

## Name collisions

- **"core"** = `@affine/core` (`packages/frontend/core`) — the application shell. Not BlockSuite `std`.
- **"server"** = `@affine/server` (`packages/backend/server`) — there is exactly one server.
- **"nbstore"** names two layers of one concept: the TS package `@affine/nbstore` (`packages/common/nbstore`) and the Rust crate `affine_nbstore` (`packages/frontend/native/nbstore`).
- **"native"** is overloaded: `affine_native` (`packages/frontend/native`, desktop SQLite/media), `@affine/server-native` (`packages/backend/native`), `affine_common` (`packages/common/native`), `mobile-native`. See `objects/native-rust/`.
- **"web app"** loosely means the whole frontend; strictly, `@affine/web` is a thin shell around `@affine/core`.
- **BlockSuite** is vendored in this repo (`blocksuite/**`, part of the yarn workspace), not pulled from npm.

Rules: cards cite source as `path:line`. Code wins over comments, and wins over these cards when they disagree — fix the card. Universes and maintenance rules: `CONTEXT.md`.
