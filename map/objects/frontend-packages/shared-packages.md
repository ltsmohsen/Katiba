---
type: object
cluster: frontend-packages
universe: live
status: verified
verified: 2026-08-24 @ a8eef5396
---

# Shared frontend packages (component library, env, i18n, templates, reader, track, theme, debug, error, s3-compat)

**One sentence:** the small cross-cutting `packages/common/*` + `packages/frontend/*` libraries that everything else composes from — UI kit, environment flags, translations, starter templates, static doc reader, telemetry, theming.

## Why this shape

These exist to keep one home per concern: design-system components (`@affine/component`), runtime environment detection/flags (`@affine/env`), user-facing strings (`@affine/i18n`), built-in workspace/doc templates (`@affine/templates`), server-free rendering of docs for previews/export (`@affine/reader`), analytics events (`@affine/track`), theme tokens, error types, and an S3-compatible client shared by client and server. None of them know about the app; the app knows about all of them.

## Shape

- `packages/frontend/component/src/{components,ui,theme,styles,hooks,lit-react}` — `@affine/component` UI kit (mixes React and Lit web components).
- `packages/common/env`, `common/error`, `common/debug`, `common/theme`, `common/s3-compat`.
- `packages/frontend/i18n/src` — translation resources + sync tooling.
- `packages/frontend/templates` — template documents (its `src` is generated/assembled; package consumed by core).
- `packages/common/reader/src/{reader.ts,doc-parser,bs-store.ts}` — headless BlockSuite reader for previews.
- `packages/frontend/track` — analytics event definitions.
- `packages/common/realtime/src/index.ts` — typed realtime request/topic maps shared by client and server gateways.
- `packages/common/graphql` — covered by its own card (`graphql-client.md`).
- `packages/common/nbstore`, `common/infra` — own cards.

## Connected to

- consumed-by: `@affine/core`, all shells, sometimes the server (`s3-compat`, `env` patterns).
- looks-like-but-is-not: `@affine/component` is a UI kit, not the application; `reader` renders docs but hosts no editing.

## If you change this

Hits: every consumer of that package (usually wide); i18n changes touch all locales under `frontend/i18n`.
Does not hit: storage formats or server logic (except `realtime` maps, which must stay in lockstep with server gateway handlers).

## Surfaces

Imported across the frontend; i18n resources also edited by translators.

## See

- `packages/common/*` and `packages/frontend/*` directory listings (this card intentionally stays shallow)
