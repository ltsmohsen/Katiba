---
type: process
status: verified
verified: 2026-08-24 @ a8eef5396
consumes:
  - '[[../objects/backend-server/server-core.md]]'
  - '[[../objects/frontend-packages/graphql-client.md]]'
  - '[[../objects/frontend-packages/graphql-client.md|@affine/graphql codegen]]'
produces:
  - evolved database schema + regenerated typed client SDK
---

# Migration flow: changing the Postgres schema end-to-end

**Input → Output:** a schema change need → applied migration + updated `@affine/graphql` types.

## Movement

1. Edit `packages/backend/server/schema.prisma` (note: package root, not a `prisma/` subdir).
2. Create migration: `yarn affine server <prisma migrate dev equivalent>` — migrations land as timestamp-named TS/SQL under `src/data/migrations/` (11 entries today, e.g. `1765500000000-backfill-permission-projection.ts`); the runner is wired via the `data-migration` script flavor (`SERVER_FLAVOR=script r ./src/index.ts`).
3. Update resolvers/models under `src/core/*` + `src/models/*` to use new fields.
4. Regenerate the SDL if API surface changed: server exposes `src/schema.gql`.
5. Frontend: regenerate `packages/common/graphql/src/schema.ts` + add/update `.gql` documents (codegen config in that package).
6. Deploy/self-host upgrade path runs pending migrations on startup or via CLI command (flavor `script`).

## If you change this

Hits: self-host upgrades (breaking changes need backfills like existing examples do), cloud release workflow, any client feature touching changed tables.
Does not hit: client-local SQLite schema (that lives in Rust `affine_nbstore`/schema crate — separate system).

## See

- `packages/backend/server/src/data/migrations/index.ts`
