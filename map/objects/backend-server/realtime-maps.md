---
type: object
cluster: backend-server
universe: live
status: verified
verified: 2026-08-24 @ a8eef5396
---

# Realtime contract maps (= `@affine/realtime`, `packages/common/realtime`)

**One sentence:** the tiny shared package that types every WebSocket message between clients and server — request maps and topic maps keyed by name, so both ends compile against one contract.

## Why this shape

Socket messages are string-keyed; left untyped they drift. This package declares e.g. `RealtimeRequestMap` (`workspace.access.get`, …) and `RealtimeTopicMap` (`copilot.delegated.*`) once; the server gateways and the client sync engines both import it, so renaming a message breaks compilation instead of runtime.

## Shape

- `packages/common/realtime/src/index.ts` — exported request/topic map types (single-file package).

## Connected to

- consumed-by: `objects/backend-server/sync-realtime.md` (gateways) and nbstore/client sync engines.
- looks-like-but-is-not: not a transport — it defines names/payload types only; Socket.IO wiring lives on both ends.

## If you change this

Hits: both sides in lockstep — a gateway handler and every client caller must ship together.
Does not hit: GraphQL API; blob HTTP endpoints.

## Surfaces

Imported by server `core/sync`, `core/realtime`, copilot delegated sessions, and client workers.

## See

- `packages/common/realtime/src/index.ts`
