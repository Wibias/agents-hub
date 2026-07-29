# memory/ — shared episodic memory

Cross-tool lesson store for Codex, Claude Code, Cursor, and Grok.

This is **not** factual reference (`knowledge/`), not standing behavior
(`rules/`), and not a step-by-step workflow (`skills/`). It records what went
wrong or surprised you in a real session, so a future agent can reuse the
decision rule.

## Why this layout

| Piece | Role |
|-------|------|
| `notes/` | One markdown file per lesson (often gitignored in public mirrors) |
| `MEMORY.md` | Index of those notes — skim before opening files |
| `pending-rules.md` | Promotion queue when the same lesson repeats (≥ 3 sessions) |
| `README.md` | This contract |

**Public vs private:** ship `MEMORY.md` and `pending-rules.md` as empty
blueprints. Keep personal notes under `notes/` locally (and out of public git
if you mirror this hub). Rebuild your own registry rows as you learn.

Codex’s built-in `~/.codex/memories` is separate and is **not** synced here.

## Knowledge vs memory

- **Knowledge:** “React Router v7 prefers loaders over `useEffect` for data.”
- **Memory:** “2026-07-05: used `useEffect` instead of a loader, lost 45 minutes. Next time check loaders first.”

## Write path

Use the `extract-approach` skill after a verified, non-obvious solve:

1. Create `notes/YYYY-MM-DD-slug.md` (kebab-case slug, under 50 characters).
2. Add a row to `MEMORY.md` with status `active`.
3. If the note’s “Rules/Knowledge candidate?” is yes, or the same lesson hits ≥ 3 sessions, add a row to `pending-rules.md`.

No tool should auto-write these files without curation.

### Note template

```markdown
# <Short title> (YYYY-MM-DD)

**Tool/context:** <Codex | Claude Code | Cursor | Grok | Multi>
**Tags:** <max 3 keywords>

## Observation
<What actually went wrong — root issue, not only the symptom.>

## Lesson
<The decision rule that was not known before this solve.>
<Cues so a future agent recognizes the situation.>

## Rules/Knowledge candidate?
<No | Yes — pending-rules.md entry planned>

## Links
- <repo-relative paths, issues, docs>
```

## Read path

1. Search `MEMORY.md` for the topic.
2. Open only the matching note(s).
3. Do not dump every note into context.

## Promotion loop

```text
session solve
  → note + MEMORY.md (active)
  → same lesson ≥ 3× → pending-rules.md
  → human merge → rules/*.mdc or knowledge/
  → MEMORY.md status → merged
```

## Retention

- Merged into rules/knowledge: set `MEMORY.md` to `merged`; keep the note file as archive (do not delete).
- One-off with no reuse: set `discarded`.
- Optional: after ~90 days, prefer merged/discarded cleanup over deleting history.
