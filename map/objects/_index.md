# objects/_index — every noun, one line each

| Card                                                                                   | Identity                                                                                      | Status   |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | -------- |
| [editor-blocksuite/blocksuite-framework.md](editor-blocksuite/blocksuite-framework.md) | BlockSuite: Yjs-backed block store + view/spec/selection framework (`blocksuite/framework/*`) | verified |
| [editor-blocksuite/affine-blocks.md](editor-blocksuite/affine-blocks.md)               | Product blocks & edgeless canvas implemented as BlockSuite extensions (`blocksuite/affine/*`) | verified |
| [frontend-apps/web-app.md](frontend-apps/web-app.md)                                   | `@affine/web` — thin browser shell around `@affine/core` + nbstore worker                     | verified |
| [frontend-apps/desktop-electron.md](frontend-apps/desktop-electron.md)                 | Electron distribution: main/helper/preload wrapping the shared renderer                       | verified |
| [frontend-apps/mobile-apps.md](frontend-apps/mobile-apps.md)                           | `@affine/mobile` shell + Capacitor iOS + Android project                                      | verified |
| [frontend-apps/admin-console.md](frontend-apps/admin-console.md)                       | `@affine/admin` — private operator SPA for cloud administration                               | verified |
| [frontend-apps/electron-api.md](frontend-apps/electron-api.md)                         | `@affine/electron-api` — typed IPC contract between Electron processes                        | verified |
| [frontend-packages/auth-token-broker.md](frontend-packages/auth-token-broker.md)       | `@affine/auth` — token refresh/brokerage shared by all client↔server calls                    | verified |
| [frontend-packages/core.md](frontend-packages/core.md)                                 | `@affine/core` — the whole application: 60+ feature modules shared by all shells              | verified |
| [frontend-packages/nbstore.md](frontend-packages/nbstore.md)                           | Local-first storage layer: TS contracts/workers (`@affine/nbstore`) + Rust SQLite impl        | verified |
| [frontend-packages/infra.md](frontend-packages/infra.md)                               | `@toeverything/infra` — DI Framework, LiveData/atoms, worker op helpers                       | verified |
| [frontend-packages/graphql-client.md](frontend-packages/graphql-client.md)             | `@affine/graphql` — typed `.gql` documents + generated schema for the server API              | verified |
| [frontend-packages/shared-packages.md](frontend-packages/shared-packages.md)           | component/env/i18n/templates/reader/track/theme/debug/error/s3-compat/realtime maps           | verified |
| [backend-server/server-core.md](backend-server/server-core.md)                         | `@affine/server` — NestJS cloud/self-host service over Postgres+Redis+S3                      | verified |
| [backend-server/sync-realtime.md](backend-server/sync-realtime.md)                     | WebSocket doc-sync + realtime gateways; typed contract in `@affine/realtime`                  | verified |
| [backend-server/copilot-plugin.md](backend-server/copilot-plugin.md)                   | Server-side AI plugin: chat, embeddings, delegated editor/tool sessions                       | verified |
| [backend-server/realtime-maps.md](backend-server/realtime-maps.md)                     | `@affine/realtime` — typed WebSocket request/topic contract shared by both ends               | verified |
| [native-rust/native-rust.md](native-rust/native-rust.md)                               | Five napi Rust crates: SQLite storage engine, sanitizers, loaders, hashcash                   | verified |
| [tests/test-suites.md](tests/test-suites.md)                                           | 7 Playwright e2e suites + `tests/kit` harness — executable behavior spec                      | verified |
| [tools/dev-tooling.md](tools/dev-tooling.md)                                           | `yarn affine` CLI dispatcher + changelog/commitlint/doc-diff/revert tools                     | verified |

Universe notes: `packages/frontend/native/sqlite_v1` = leftover (legacy v1 local DB schema); root `scripts/` = repo maintenance scripts folded into `tools/dev-tooling.md`; no ghosts identified at mapping time.
