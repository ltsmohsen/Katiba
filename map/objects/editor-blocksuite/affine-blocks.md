---
type: object
cluster: editor-blocksuite
universe: live
status: verified
verified: 2026-08-24 @ a8eef5396
---

# AFFiNE blocks & canvas (= `blocksuite/affine/*`, umbrella package `@blocksuite/affine`)

**One sentence:** the product-level editor content — every block type users see (paragraph, list, image, code, database/table, callout, embed…), the edgeless whiteboard toolkit (gfx), widgets, rich-text, and fragments — implemented as BlockSuite extensions.

## Why this shape

Blocks are deliberately separated from both the framework below them and the application shell above them: each block family is its own workspace package (`@blocksuite/affine-block-*`, `@blocksuite/affine-gfx-*`, `@blocksuite/affine-fragment-*`, `@blocksuite/affine-widget-*`), aggregated by the umbrella `blocksuite/affine/all` → `@blocksuite/affine`. This keeps individual blocks independently loadable and lets non-AFFiNE consumers take subsets.

## Shape

- `blocksuite/affine/all/package.json` — umbrella aggregating ~40+ sub-packages (attachment, bookmark, code, database, image, latex, paragraph, surface, …).
- `blocksuite/affine/blocks/` — block implementations (one package per type).
- `blocksuite/affine/gfx/` — edgeless canvas toolkits (brush, connector, group, pointer…).
- `blocksuite/affine/fragments/`, `widgets/`, `inlines/`, `rich-text/`, `data-view/` (structured table views), `model/`, `shared/`, `components/`, `foundation/`.
- `blocksuite/affine/ext-loader` — loads the aggregate into an editor instance.

## Connected to

- owned-by / built-on: `objects/editor-blocksuite/blocksuite-framework.md`.
- consumed-by: `@affine/core` (`packages/frontend/core/package.json` depends on `@blocksuite/affine` and many individual block packages).
- looks-like-but-is-not: not app chrome — toolbars/menus of the application live in `@affine/core`; this is only what renders _inside_ the editor surface.

## If you change this

Hits: rendered documents everywhere (web/desktop/mobile), doc snapshots stored locally and in cloud blobs, `packages/frontend/templates` (starter templates embed these block types).
Does not hit: server storage logic (docs are opaque binary to the server); sync protocol framing.

## Surfaces

Rendered for end users on every platform; edited by humans under `blocksuite/affine/**`; exercised by `tests/blocksuite` e2e suite.

## See

- `blocksuite/affine/all/package.json`
