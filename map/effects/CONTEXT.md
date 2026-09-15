# effects/ — change-impact index

A catalog only: "if you are changing X, open these cards first." It never copies card content; when a row and a card disagree, fix the card.

## Frontend

| You are changing…                              | Open before planning                                                                                                                            |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| A feature module in `@affine/core`             | `objects/frontend-packages/core.md`, `objects/frontend-packages/infra.md` (DI pattern), `effects` rows for storage if the feature persists data |
| Anything under `blocksuite/framework/*`        | `objects/editor-blocksuite/blocksuite-framework.md` + `affine-blocks.md`; assume all platforms + stored snapshots affected                      |
| A block type / edgeless gfx tool               | `objects/editor-blocksuite/affine-blocks.md`; check snapshot compat and `packages/frontend/templates` usage                                     |
| Local persistence (nbstore TS or Rust)         | `objects/frontend-packages/nbstore.md`, `objects/native-rust/native-rust.md`, `processes/doc-sync.md`                                           |
| App shell bootstrap (web/desktop/mobile entry) | `processes/frontend-boot.md` + that shell's object card                                                                                         |
| Desktop main-process code                      | `objects/frontend-apps/desktop-electron.md`; preload/IPC contract (`electron-api`) consumers                                                    |
| GraphQL queries in `@affine/graphql`           | `objects/backend-server/server-core.md` resolvers; regenerate types after server SDL change                                                     |
| i18n strings                                   | `shared-packages.md` (i18n) — all locales; missing keys fall back at runtime                                                                    |

## Backend

| You are changing…               | Open before planning                                                                              |
| ------------------------------- | ------------------------------------------------------------------------------------------------- |
| Server domain module (`core/*`) | `objects/backend-server/server-core.md`, `processes/server-boot.md`                               |
| Postgres schema                 | `processes/migration-flow.md`; plan backfill if data exists                                       |
| Sync/realtime gateway messages  | `objects/backend-server/sync-realtime.md`; update `@affine/realtime` maps on BOTH sides in one PR |
| Copilot behavior                | `copilot-plugin.md`; run `tests/affine-cloud-copilot`                                             |
| Plugins list/config surface     | `server-boot.md` step 3; self-host docs implications                                              |

## Cross-cutting

| You are changing…                                           | Open before planning                                                                    |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Rust crates (`packages/*/native*`)                          | `native-rust.md`; rebuild steps in `dev-workflow.md`; ABI consumers via `index.d.ts`    |
| Root build/tooling (`tools/cli`, rspack configs, tsconfigs) | `processes/dev-workflow.md` + `build-release.md`; every package's scripts               |
| Yjs document format assumptions                             | `doc-sync.md`, both editor cards, nbstore migration story                               |
| Release channels/versioning                                 | `build-release.md`                                                                      |
| E2E test harness/fixtures (`tests/kit`)                     | `objects/tests/test-suites.md` — suites share the kit; a kit change can flake all seven |
| Repo scripts / CLI dispatcher (`tools/*`)                   | `objects/tools/dev-tooling.md` — every dev/build entry point routes through it          |

## Deliberately unaffected by most changes

- Pure-local workspaces never touch: server cards, `graphql-client.md`, copilot.
- The server treats docs as opaque binaries — editor-format changes do not require server changes unless metadata tables do.
