# rules/

Standing “when X, then Y” behavior for agents. Prefer promoting repeated memory
lessons through `memory/pending-rules.md` into a rule here.

## What belongs here

| Content | Place |
|---------|--------|
| Cross-project behavior | `rules/*.mdc` (this folder) |
| One repo’s conventions | That repo’s `.cursor/rules` / `agent-rules` / project `AGENTS.md` |
| Facts / catalogs | `knowledge/` |
| Session lessons | `memory/` |
| Workflows | `skills/` |

**Do not** put private project maps, deploy secrets, or machine-absolute globs
in the public hub. Project-specific rules stay in the project.

## Files in this hub

Global defaults only (TypeScript, git commits, Playwright-agnostic UI gates,
voice, vault/memory notes, etc.). Stack recipes that are repo-specific belong
with that repository.
