---
type: object
cluster: frontend-packages
universe: live
status: verified
verified: 2026-08-24 @ a8eef5396
---

# Auth token broker (= `@affine/auth`, `packages/common/auth`)

**One sentence:** a small shared package implementing token refresh/brokerage for client ↔ server auth — obtaining, storing, and refreshing access tokens used by the GraphQL fetcher and sync connections.

## Why this shape

Multiple clients of the same session (UI queries, websocket gateways, blob requests) must share one auth state and coordinate refresh so parallel 401s don't stampede the auth endpoint. A tiny dedicated package keeps that logic out of both `@affine/graphql` transport and nbstore sync engines; its spec file (`token-broker.spec.ts`) pins the behavior.

## Shape

- `packages/common/auth/src/token-broker.ts` — the broker implementation.
- `src/index.ts` — re-exports it (whole package is essentially one module).

## Connected to

- consumed-by: GraphQL fetcher (`graphql-client.md`) and client-side server communication in `@affine/core`.
- joins: server `core/auth` endpoints (login/refresh/cookie semantics).
- looks-like-but-is-not: not the server's auth module (that's `server/src/core/auth`) despite the similar name.

## If you change this

Hits: every authenticated request path on all platforms; login flows in e2e suites.
Does not hit: server-side session validation itself (change that in `core/auth`).

## Surfaces

Imported by frontend packages; exercised by `tests/affine-cloud*`.

## See

- `packages/common/auth/src/token-broker.ts`
