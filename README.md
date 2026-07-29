# Agent Hub (`.agents`)

Shared home for agent **skills**, **rules**, **memory**, and **knowledge** across
Codex, Claude Code, Cursor, and Grok.

One hub. Many harnesses. No skill farms inside each tool’s config directory.

## Layout

```text
.agents/
  AGENTS.md      # routing + policy (canonical)
  SOUL.md         # voice / worldview (canonical)
  CONTEXT.md      # shared vocabulary
  skills/         # all Agent Skills live here
  rules/          # standing behavior (.mdc)
  memory/         # episodic lessons (see memory/README.md)
  knowledge/      # stable facts + index tooling
```

Install location is usually `~/.agents` (Windows: `%USERPROFILE%\.agents`).

## Skills live in `.agents`, not in harness folders

**Canonical skill tree:** `~/.agents/skills/<skill-name>/SKILL.md`

Do **not** maintain parallel skill copies under:

- `~/.codex/skills/` (except tool-shipped system skills you do not own)
- `~/.claude/skills/` as a second source of truth
- `~/.cursor/skills/` as a separate tree of skill bodies

Harnesses should **discover** the hub skills (junction, symlink, or config root),
not own divergent copies.

Typical Cursor setup on Windows: `~/.cursor/skills` is a **junction** to
`~/.agents/skills`, so every skill added under the hub appears in Cursor
automatically.

```text
~/.agents/skills/foo/SKILL.md     ← edit here
~/.cursor/skills/foo              ← same files via junction (do not fork)
```

Project-local skills (`.agents/skills` or `.cursor/skills` inside a repo) are
separate: they are project scope. This hub is the **user-global** catalog.

## `AGENTS.md` in global harness folders

Each harness still has (or needs) a **thin pointer** in its own global config
dir. That file is not the policy — it only points at the hub.

| Harness | Global pointer file | Role |
|---------|---------------------|------|
| Codex | `~/.codex/AGENTS.md` | Short pointer + any Codex-only orchestration notes |
| Claude Code | `~/.claude/CLAUDE.md` | `@`-includes (or equivalent) of hub `SOUL.md` / `AGENTS.md` / `CONTEXT.md` |
| Cursor | User rules / project rules as needed | Skills via junction to `~/.agents/skills`; hub `AGENTS.md` is the policy source |
| Grok / others | Tool-specific instruction file | Point at the same hub files |

**Precedence** (also stated in hub `AGENTS.md`):

1. Explicit user prompt  
2. Project `AGENTS.md` (repo)  
3. This hub’s `AGENTS.md`  
4. Skills  

**Do not** duplicate the full hub policy into `~/.codex/AGENTS.md` or
`~/.claude/CLAUDE.md`. Keep those files small: “read the hub” + harness-specific
shell or delegation constraints if the tool will not load the hub otherwise.

Example Codex pointer shape:

```markdown
# Pointer to hub

Voice: ~/.agents/SOUL.md
Rules: ~/.agents/AGENTS.md
Vocabulary: ~/.agents/CONTEXT.md
```

Example Claude pointer shape:

```markdown
@~/.agents/SOUL.md
@~/.agents/AGENTS.md
@~/.agents/CONTEXT.md
```

(Use absolute paths if your harness requires them.)

## Memory and knowledge

- **`memory/`** — session lessons via `extract-approach`; index in `MEMORY.md`;
  promotion queue in `pending-rules.md`. See `memory/README.md`.
- **`knowledge/`** — stable facts and catalogs. Generated `INDEX.md` /
  `index.json` may be local-only; the builder scripts stay in the hub.

## Language

**Default:** English for explanations, product copy, UX feedback, and summaries
(`SOUL.md`, `rules/voice.mdc`). Code, identifiers, commands, and toolchain
output stay English.

Forkers and installers can change the explanation/product language. The
[install prompt](prompts/install-hub.md) **hard-stops** and asks whether to keep
English or switch (it then updates `SOUL.md` and `rules/voice.mdc`).

## Rules

Standing “when X, then Y” behavior lives in `rules/*.mdc`. Prefer promoting
repeated memory lessons through `pending-rules.md` rather than growing
one-off chat instructions.

## What not to put here

- Harness secrets, API keys, or auth tokens  
- Full vendored clones of unrelated tools (install runtimes beside the hub, e.g. `~/.understand-anything-plugin`)  
- Divergent SOUL forks per tool  

## Install

Paste [`prompts/install-hub.md`](prompts/install-hub.md) into an agent. It will:

1. Clone this repo to `~/.agents`
2. **Hard-stop** and ask how to wire harnesses: **ALL**, **SPECIFIC**, or **NONE**
3. Wire only what you approve (Codex, Claude, Cursor, OpenCode, Hermes, OpenClaw)
4. **Hard-stop** and ask whether to keep **English** for explanations / product copy / UX feedback, or **CHANGE** to another language
5. **Tell you**, then delete `examples/` and `prompts/` from the installed hub (install-only)

Example pointer templates (removed from `~/.agents` after a successful install):

| Harness | Example |
|---------|---------|
| Codex | [`examples/codex-AGENTS.md`](examples/codex-AGENTS.md) |
| Claude Code | [`examples/claude-CLAUDE.md`](examples/claude-CLAUDE.md) |
| Cursor | [`examples/cursor-skills.md`](examples/cursor-skills.md) |
| OpenCode | [`examples/opencode-AGENTS.md`](examples/opencode-AGENTS.md) |
| Hermes | [`examples/hermes-AGENTS.md`](examples/hermes-AGENTS.md) |
| OpenClaw | [`examples/openclaw-workspace-AGENTS.md`](examples/openclaw-workspace-AGENTS.md) |

The install prompt does not edit harness `config.toml` / `settings.json` /
`openclaw.json` unless you ask.

## License

MIT — see [LICENSE](LICENSE).

Third-party skill adaptations and their license texts:
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) and [`licenses/`](licenses/).
