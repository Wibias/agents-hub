# knowledge/ — curated facts

Stable, cross-harness reference material. Not session lessons (`memory/`), not
standing behavior (`rules/`), not workflows (`skills/`).

## What belongs here

| Content | Destination |
|---------|-------------|
| Fact / catalog / tech reference | `knowledge/` (here) |
| Session lesson / observation | `memory/` |
| “When X, then Y” | `rules/*.mdc` |
| Step-by-step process | `skills/` |

**Rule of thumb:** “React Router prefers loaders…” → knowledge. “In session X I burned 45 minutes on useEffect…” → memory.

## Layout

| Path | Role |
|------|------|
| `schema.json` | JSON Schema for index entries |
| `build-index.mjs` | Scans hub + harness skill/rule roots; writes `index.json` + `INDEX.md` |
| `compare-dirs.mjs` | SHA compare of two directories (utility) |
| `external/` | Read-only remote catalogs (e.g. cybersecurity skill list) — not installed |
| `design-references/` | Optional local design library (often gitignored in public mirrors) |
| `index.json` / `INDEX.md` | **Generated** — machine + human indexes (gitignored; rebuild locally) |

## Public vs private

Ship the machinery (`README`, `schema.json`, builders, `external/` catalogs).  
Keep generated indexes and heavy `design-references/` out of public git — they embed absolute machine paths and whatever projects you scanned.

## Rebuild index

From this directory:

```powershell
cd ~/.agents/knowledge   # or this repo's knowledge/
node build-index.mjs
```

Optional project scan (absolute path):

```powershell
$env:AGENTS_KNOWLEDGE_PROJECT_ROOT = "D:\path\to\your\repo"
node build-index.mjs
```

Validate:

```powershell
node -e "JSON.parse(require('fs').readFileSync('index.json','utf8')); console.log('OK')"
```

## Adding entries

1. Confirm it is a stable fact (else use `memory/` / `rules/` / `skills/`).
2. Put hub-owned facts at knowledge root (or under a clear subfolder); put third-party catalogs under `external/`.
3. Prefer `status: "catalog-only"` until reviewed, then `"active"`. Archive with `"archived"` — do not delete history lightly.
4. Rebuild the index.

## Size guidance

- Description per entry: under ~300 characters  
- `index.json`: keep under ~500 KB when practical  
- Do not dump the whole index into agent context — search, then open hits  

Codex’s built-in `~/.codex/memories` is separate and is not managed here.
