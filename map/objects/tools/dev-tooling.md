---
type: object
cluster: tools
universe: live
status: verified
verified: 2026-08-24 @ a8eef5396
---

# Dev tooling (= `tools/*`: cli, utils, changelog, commitlint, doc-diff, revert-update, copilot-result, playstore-auto-bump, @types)

**One sentence:** the repo's own infrastructure — the `yarn affine <target> <cmd>` dispatcher CLI, shared build utilities, and small maintenance scripts (changelog generation, commitlint config, doc diffing, update reverting).

## Why this shape

A 130-package monorepo needs one command grammar instead of per-package scripts. `@affine-tools/cli` implements `yarn affine …` (dev/build/test for each target); `utils` carries shared helpers; the rest are single-purpose scripts kept versioned with the code they operate on.

## Shape

- `tools/cli/src/{affine.ts,dev.ts,…}` — command dispatch (what `yarn dev` actually calls).
- `tools/utils` — shared build/script helpers consumed by cli and workflows.
- `tools/changelog`, `tools/commitlint` — release notes + conventional-commit linting.
- `tools/doc-diff`, `tools/revert-update` — doc-content maintenance utilities.
- `tools/copilot-result`, `tools/playstore-auto-bump` — CI support scripts.
- `tools/@types/{env,assets,build-config}` — ambient types for build-time env.

## Connected to

- drives: every package's dev/build lifecycle (`processes/dev-workflow.md`, `build-release.md`).
- looks-like-but-is-not: not shipped product code; nothing here reaches end users directly.

## If you change this

Hits: all developers' workflows and CI scripts that invoke `yarn affine`.
Does not hit: runtime product behavior.

## Surfaces

Terminal usage only; edited under `tools/**`.

## See

- `tools/cli/src/affine.ts`
