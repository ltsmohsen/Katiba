---
type: object
cluster: frontend-apps
universe: live
status: verified
verified: 2026-08-24 @ a8eef5396
---

# Admin console (= `@affine/admin`, `packages/frontend/admin`)

**One sentence:** a private single-page admin app for AFFiNE Cloud operators — user/workspace management dashboards and queue dashboards — built on the same component/core/graphql stack as the product but never shipped to end users.

## Why this shape

Server administration needs UIs (user lookup, feature flags, queue inspection via `@queuedash/ui`) but they must not live inside the product bundle. A separate private SPA reusing `@affine/component`, `@affine/core` internals, and `@affine/graphql` gives operators tooling without bloating or exposing admin surfaces publicly (`package.json` marks it private).

## Shape

- `packages/frontend/admin/src/{app.tsx,index.tsx}` — SPA entry.
- `src/modules/`, `components/` — admin feature areas.
- `src/use-query.ts`, `use-mutation.ts`, `fetch-utils.ts` — GraphQL plumbing against the server's admin API (mirrors `.gql` docs under `packages/common/graphql/src/graphql/admin/`).

## Connected to

- calls: `objects/backend-server/server-core.md` admin resolvers.
- shares: `objects/frontend-packages/shared-packages.md` (component kit) and core modules.
- looks-like-but-is-not: not part of the shipped web app; separate build/deploy target.

## If you change this

Hits: cloud operator workflows only; server admin resolvers if API changes.
Does not hit: end-user product surfaces; self-host deployments that don't serve it.

## Surfaces

Deployed privately for AFFiNE Cloud staff; developed like any frontend package.

## See

- `packages/frontend/admin/package.json`
