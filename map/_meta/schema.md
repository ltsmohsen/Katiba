# Schema — closed node types in this map

Only these node types exist in `map/`. Do not invent new shapes; extend these.

## Object card (`objects/<cluster>/<name>.md`)

Frontmatter:

```yaml
---
type: object
cluster: editor-blocksuite | frontend-apps | frontend-packages | backend-server | native-rust
universe: live | leftover | ghost
status: verified | stale | stub
verified: YYYY-MM-DD @ <commit>
---
```

Required sections, in order:

1. **One sentence** — product name and code/package name if they differ.
2. **Why this shape** — the load-bearing reason, not a field tour.
3. **Shape** — owning files/dirs with `path:line` citations.
4. **Connected to** — owns / owned-by / joins / looks-like-but-is-not.
5. **If you change this** — **Hits** / **Does not hit** (first-order only).
6. **Surfaces** — who reads/writes it (apps, agents, humans).
7. **See** — source files; at most one as-built page.

## Process card (`processes/<name>.md`)

Frontmatter adds `consumes:` / `produces:` linking object cards. Body: Input → Movement (numbered steps, each cited) → Output; ends with Hits / Does not hit.

## Effect row (`effects/CONTEXT.md`)

A catalog line: "if you are changing X → open cards A, B, C". Rows point; they never copy card content. If an effect row and a card disagree, fix the card.

## Index line (`objects/_index.md`)

One line per noun: path, one-sentence identity, status.
