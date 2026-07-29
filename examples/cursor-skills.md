# Cursor — skills discovery (no global AGENTS.md required)

Cursor does not need a fat global `AGENTS.md` in `~/.cursor/`. Point **skills**
at the hub and keep policy in `~/.agents/AGENTS.md` (via user rules or project
`AGENTS.md` as you prefer).

## Skills junction (Windows)

`~/.cursor/skills` must resolve to `~/.agents/skills`:

```bat
mklink /J "%USERPROFILE%\.cursor\skills" "%USERPROFILE%\.agents\skills"
```

On macOS/Linux, use a symlink:

```bash
ln -sfn "$HOME/.agents/skills" "$HOME/.cursor/skills"
```

### Rules

- Edit skills only under `~/.agents/skills/`.
- Never create `~/.cursor/skills/<name>` as a nested junction/symlink when
  `~/.cursor/skills` already points at the hub (that overwrites hub folders).
- If `~/.cursor/skills` is a real directory with its own copies, backup before
  replacing with a junction/symlink — ask the user first.

## Optional policy

Add a short Cursor user rule: “Follow `~/.agents/AGENTS.md` and `~/.agents/SOUL.md`.”
Do not duplicate the full hub into Cursor settings.
