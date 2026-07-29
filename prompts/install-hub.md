# Install prompt — agent hub → `~/.agents` + harness pointers

Paste **everything below the line** into a coding agent. Replace `REPO_URL` if needed.

The agent must obey **HARD STOP** sections: stop, ask, wait for the user’s reply,
then resume at the named phase. Do not skip ahead. Do not assume answers.

---

Install and wire the agent hub.

## Constants

- **REPO_URL:** `https://github.com/Wibias/agents-hub.git`
- **HUB:** `~/.agents` (Windows: `%USERPROFILE%\.agents`)
- **Harness ids:** `codex` | `claude` | `cursor` | `opencode` | `hermes` | `openclaw`
- **Install-only paths (delete after success):** `HUB/examples/`, `HUB/prompts/`

Do **not** edit harness config files (`config.toml`, `settings.json`,
`openclaw.json`, secrets) unless the user explicitly asks later.

---

## Phase 1 — Install hub only

1. Resolve `HUB` to an absolute path.
2. If `HUB` is missing → `git clone REPO_URL HUB`.
3. If `HUB` exists and is this repo → `git status`; if clean, `git pull --ff-only` (or report divergence and **HARD STOP**).
4. If `HUB` exists but is something else → **HARD STOP**: offer backup-and-replace or abort; wait.
5. Confirm `HUB/AGENTS.md`, `HUB/SOUL.md`, `HUB/CONTEXT.md`, `HUB/skills/` exist.
6. Detect which harness home dirs exist on this machine (for the question below):
   - `codex` → `~/.codex`
   - `claude` → `~/.claude`
   - `cursor` → `~/.cursor`
   - `opencode` → `~/.config/opencode` or `~/.opencode` (whichever exists)
   - `hermes` → `~/.hermes`
   - `openclaw` → `~/.openclaw`

Do not write harness pointers yet.

---

## HARD STOP A — harness wiring (mandatory wait)

Stop all tool use after printing this exact question block. Do not create or
overwrite any harness instruction files until the user answers.

```text
Hub is installed at: <HUB>

Detected harness folders: <list or "none">

I can wire thin instruction pointers (and Cursor skills junction) using the
examples under examples/.

How should I wire harnesses?
  ALL       — wire every detected harness above
  SPECIFIC  — wire only the ones you list (next line)
  NONE      — skip harness edits entirely

Reply with one of:
  ALL
  NONE
  SPECIFIC: codex, claude, cursor, ...

I will not continue until you answer.
```

**Resume rule:** When the user replies, continue at **Phase 2**. Do not re-clone
unless Phase 1 failed. If the reply is ambiguous, ask one clarifying question
and HARD STOP again.

---

## Phase 2 — Wire harnesses

- **NONE** → skip to **HARD STOP B**.
- **ALL** → target every detected harness id from Phase 1.
- **SPECIFIC:** → target only the ids listed (warn and skip unknown/undetected ids).

For each selected id, backup existing files to `*.bak-<timestamp>` before write:

| Id | Action | Example source |
|----|--------|----------------|
| `codex` | Write `~/.codex/AGENTS.md` | `examples/codex-AGENTS.md` |
| `claude` | Write `~/.claude/CLAUDE.md` | `examples/claude-CLAUDE.md` |
| `opencode` | Write global OpenCode `AGENTS.md` at the detected config path | `examples/opencode-AGENTS.md` |
| `hermes` | Write `~/.hermes/AGENTS.md` if `~/.hermes` exists | `examples/hermes-AGENTS.md` |
| `openclaw` | Write `~/.openclaw/workspace/AGENTS.md` (create workspace dir if needed). Do **not** overwrite workspace `SOUL.md` / `IDENTITY.md` / `USER.md`. | `examples/openclaw-workspace-AGENTS.md` |
| `cursor` | Follow `examples/cursor-skills.md` (junction/symlink only). If `~/.cursor/skills` is a real populated directory, **HARD STOP** and ask before replacing. | `examples/cursor-skills.md` |

Rewrite `~` paths to absolute forms if the harness needs them on this OS.

If a target file already has substantial custom policy (not a thin pointer),
**HARD STOP** for that harness: show a short diff summary and ask overwrite /
merge-pointer-at-top / skip.

After wiring (or on NONE), continue at **HARD STOP B**.

---

## HARD STOP B — operator language (mandatory wait)

Stop all tool use after printing this exact question block. Do not edit
`SOUL.md` or `rules/voice.mdc` for language until the user answers.

```text
Default operator language (explanations, product copy, UX feedback, summaries)
is English — see SOUL.md and rules/voice.mdc.
Code, identifiers, commands, and toolchain output stay English either way.

Keep English, or change the preferred language for those surfaces?

Reply with one of:
  KEEP
  CHANGE: <language>     e.g. CHANGE: German

I will not continue until you answer.
```

**Resume rule:** When the user replies, continue at **Phase 3**. If the reply is
ambiguous, ask one clarifying question and HARD STOP again.

---

## Phase 3 — Apply language preference

- **KEEP** → leave `HUB/SOUL.md` and `HUB/rules/voice.mdc` unchanged; go to **Phase 4**.
- **CHANGE: \<language\>** → update both files so the preferred language for
  explanations / product copy / UX feedback / summaries is that language.
  Keep the rule that **code, identifiers, commands, paths, and toolchain
  output stay English**. Mirror the change in the short `rules/voice.mdc`
  extract and the `SOUL.md` “Language and tone” section. Do not invent a full
  locale rewrite of the hub docs.

Then go to **Phase 4**.

---

## Phase 4 — Remove install-only folders (tell the user, then delete)

Print this before deleting:

```text
Install helpers are no longer needed inside ~/.agents after setup:
  - examples/   (harness pointer templates — already applied or skipped)
  - prompts/    (this install prompt)

I will delete both directories from HUB now so the hub stays policy + skills only.
Your harness pointer files outside HUB are unchanged by this delete.
```

Then delete `HUB/examples/` and `HUB/prompts/` recursively.  
If delete fails, report paths and continue with verification.

Do **not** delete these silently. The message above is mandatory.

---

## Phase 5 — Verify and stop

Print:

```text
HUB:            <path> (remote, branch, head)
Wired:          <ids and actions>
Skipped:        <ids and why>
Language:       KEEP | CHANGE: <language>
Removed:        HUB/examples, HUB/prompts (yes/no)
Cursor skills:  <junction/symlink target or n/a>
```

Do not commit or push unless the user asks. End the turn.
