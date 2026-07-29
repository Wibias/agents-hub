# Codex — pointer to agent hub

Canonical identity and policy live in `~/.agents`. Do not duplicate them here.

- Voice / worldview: `~/.agents/SOUL.md`
- Full rules: `~/.agents/AGENTS.md`
- Vocabulary: `~/.agents/CONTEXT.md`

Skills live under `~/.agents/skills/` (not a second catalog under `~/.codex/skills/`,
except Codex system skills you do not own).

**Subagents do not read this file or the hub automatically** — when spawning
workers, inline the relevant hard rules from `~/.agents/AGENTS.md` in each brief.
