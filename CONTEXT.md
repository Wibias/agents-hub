# CONTEXT.md — shared language

Agent vocabulary for this hub. Identity: `SOUL.md`. Routing and policy: `AGENTS.md`.

## Agent stack

- **Hub** — this directory (`~/.agents` when installed as the user hub) is the single source of truth
- **SOUL** — only this hub’s `SOUL.md` is canonical (no tool-local forks)
- **Active tools** — Codex, Claude Code, Cursor, Grok
- **Skills** — `skills/` (flat layout)
- **Rules** — `rules/`
- **Knowledge** — `knowledge/` (stable facts; generated indexes may be local-only)
- **Memory** — `memory/` (episodic lessons; see `memory/README.md` — no separate `learnings/` tree)

## Cross-project terms

| Term | Meaning |
|------|---------|
| **Green Gate** | Tests, doctor, and lints green before handoff |
| **Blast Radius** | How many modules/files a change touches |
| **Screenshot-Check** | UI is not done until there is live browser proof |
| **Close the Loop** | Agent verifies output via CLI, tests, or screenshots |
| **Harness is the model** | System form (rules, hooks, gates) beats a raw model upgrade |
