# OpenClaw workspace — pointer to agent hub

OpenClaw injects workspace `AGENTS.md` (default `~/.openclaw/workspace/AGENTS.md`)
each session. Keep **this** file as a thin pointer at the hub — do not paste the
full hub policy here, and do not overwrite OpenClaw’s separate `SOUL.md` /
`IDENTITY.md` / `USER.md` unless the user asks.

## Hub

- Voice / worldview: `~/.agents/SOUL.md` (hub canonical; optional to mirror into workspace `SOUL.md` only if the user wants)
- Full rules: `~/.agents/AGENTS.md`
- Vocabulary: `~/.agents/CONTEXT.md`

Skills for the shared catalog live under `~/.agents/skills/`. OpenClaw may also
have managed skills under `~/.openclaw/skills/` — do not delete those; treat the
hub as the cross-harness catalog.

## Note

Do not edit `~/.openclaw/openclaw.json` or credentials unless the user explicitly
asks. This install only updates workspace instruction markdown when approved.
