---
type: object
cluster: backend-server
universe: live
status: verified
verified: 2026-08-24 @ a8eef5396
---

# Copilot plugin (= `plugins/copilot`, server-side AI subsystem)

**One sentence:** the AFFiNE Cloud AI feature — chat sessions, prompt management, embeddings, delegated editor/tool runs — structured as a server plugin rather than core, because AI is optional per deployment.

## Why this shape

Self-hosters may want AFFiNE without AI (cost, privacy, provider keys), so copilot is a plugin wired by configuration like `oauth` or `payment`. Inside, it separates concerns further: `core/` (providers/models), `conversation/` (chat history), `embedding/` (vectors), `delegated/` (editor/tool delegation over realtime), `byok/` (bring-your-own-key).

## Shape

- `packages/backend/server/src/plugins/copilot/{controller.ts,config.ts,feature.ts}` — entry/config/feature-gates.
- Subdirs seen: `access`, `byok`, `compat`, `conversation`, `core`, `delegated`, `embedding`.
- Client counterpart lives in frontend (AI modules in `@affine/core/modules/*ai*` family) talking via GraphQL + realtime topics (`copilot.delegated.*` in `@affine/realtime`).
- Tested separately: `tests/affine-cloud-copilot` e2e suite.

## Connected to

- plugs-into: `objects/backend-server/server-core.md` module graph.
- uses: realtime gateways for delegated sessions (`sync-realtime.md`).
- looks-like-but-is-not: not a standalone service — same process, gated at bootstrap.

## If you change this

Hits: copilot e2e suite; client AI features; deployment config surface.
Does not hit: doc sync/storage; non-copilot plugins.

## Surfaces

GraphQL resolvers + websocket topics; configured per deployment; developed under `plugins/copilot/**`.

## See

- `packages/backend/server/src/plugins/copilot/controller.ts`
