---
type: object
cluster: tests
universe: live
status: verified
verified: 2026-08-24 @ a8eef5396
---

# Test suites & kit (= `tests/*`, `@affine-test/*`)

**One sentence:** seven Playwright e2e suites (local, desktop, desktop-cloud, cloud, cloud-copilot, mobile, blocksuite) plus a shared `kit` of fixtures and helpers — the executable specification of user-visible behavior.

## Why this shape

Each distribution needs its own boot path (web server vs packaged Electron vs Capacitor app vs full cloud stack), so suites are split by what they launch rather than by feature. The `kit` package centralizes Playwright setup, Electron launching, mobile drivers, BlockSuite test helpers (`src/bs`, `src/electron.ts`, `src/mobile.ts`, `src/playwright.ts`), and shared fixtures so suites stay thin.

## Shape

- `tests/affine-local` — web app with local-only workspaces.
- `tests/affine-desktop`, `tests/affine-desktop-cloud` — packaged Electron runs.
- `tests/affine-cloud`, `tests/affine-cloud-copilot` — full cloud stack incl. copilot plugin.
- `tests/affine-mobile` — mobile shell; `tests/blocksuite` — editor engine level.
- `tests/fixtures`, `tests/kit/src/{bs,electron.ts,mobile.ts,playwright.ts,utils}` — data + harness.

## Connected to

- exercises: every shipping surface (all four shells, editor blocks, server modules).
- looks-like-but-is-not: not unit tests — those live inside packages as `*.spec.ts` next to sources.

## If you change this

Hits: CI matrix in `.github/workflows/build-test.yml`; flaky-test budget.
Does not hit: product code (tests import it, never the reverse).

## Surfaces

Run via `yarn affine <suite> test`; read as behavior documentation when tracing features.

## See

- `tests/kit/package.json`
