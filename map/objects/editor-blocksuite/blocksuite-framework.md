---
type: object
cluster: editor-blocksuite
universe: live
status: verified
verified: 2026-08-24 @ a8eef5396
---

# BlockSuite framework (= `blocksuite/framework/*`, npm scope `@blocksuite/*`)

**One sentence:** the headless document/canvas editing framework AFFiNE is built on — a block-tree data store over Yjs plus the view/selection/command layer that renders it — vendored inside this monorepo rather than pulled from npm.

## Why this shape

The editor state model must be CRDT-based (local-first offline editing with later merge) and renderer-agnostic (same data feeds doc pages, whiteboard canvas, and mobile). Yjs provides the CRDT; `@blocksuite/store` wraps it in a schema'd block tree; `@blocksuite/std` supplies the framework-independent spec/view machinery so blocks can render to DOM, canvas (edgeless), or static HTML for export.

## Shape

- `blocksuite/framework/store/src` — `@blocksuite/store`: block tree, schema, transformer (snapshot import/export), reactive bindings; deps include `yjs ^13.6`, `y-protocols`, `lib0`, `rxjs` (`blocksuite/framework/store/package.json`).
- `blocksuite/framework/std/src` — `@blocksuite/std`: view (custom elements), spec, selection, clipboard, command pipeline, inline editor, gfx hooks.
- `blocksuite/framework/sync/src` — `@blocksuite/sync`: sync engine peers.
- `blocksuite/framework/global/src` — `@blocksuite/global`: shared utils/types.
- `blocksuite/docs`, `blocksuite/playground`, `blocksuite/integration-test` — framework-level docs and test beds.

## Connected to

- owned-by: the monorepo root workspace (`package.json` workspaces includes `blocksuite/**/*`).
- joins: `blocksuite/affine/**` implements concrete blocks on top of it; `@affine/core` instantiates editors through it.
- looks-like-but-is-not: it is not "the AFFiNE app" — no product UI lives here; also not an external dependency despite the npm-style naming.

## If you change this

Hits: every block in `blocksuite/affine/blocks/*`, `@affine/core` editor surfaces, all app shells (web/desktop/mobile share the editor), snapshot compatibility for existing user docs.
Does not hit: server-side business modules — the server stores doc binaries as opaque updates (`packages/backend/server/src/core/doc`); it does not import BlockSuite.

## Surfaces

Read/written by: web, desktop, iOS/Android frontends, static reader/export paths (`packages/common/reader`). Humans edit it via `blocksuite/**`.

## See

- `blocksuite/framework/store/src/index.ts`
- `blocksuite/docs`
