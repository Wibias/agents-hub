# Agent Hub — AGENTS.md

Voice and worldview: `SOUL.md` (canonical in this hub — do not maintain tool-local SOUL forks).
Shared vocabulary: `CONTEXT.md`.

**Precedence:** explicit user prompt > project `AGENTS.md` > this file > skills.

**Active tools:** Codex, Claude Code, Cursor, Grok. (Other harnesses may remain on disk; this hub does not maintain them.)

---

## Strong-model guidance

- **Outcome + constraints + verification** — state what you will produce, what you will not touch, and how you will prove it done.
- **No process theater.** Do not recap plans longer than the task; do not ask before acting on clearly scoped work.
- **Plan proportional to risk.** Trivial fix → no plan. Cross-module or destructive → brief plan. Multi-owner → structured plan.
- **Verify before claiming done.** Tests green, screenshot when UI changed, gate command output as evidence.

---

## Windows shell (hard — inline in every worker brief)

- All shell via PowerShell (`pwsh`). Never cmd/bash for agent work.
- No `;` chaining outside PowerShell (cmd treats `;` as a literal argument).
- No `$null` redirect outside PowerShell; use `Out-Null` or `NUL`.
- No `ls`; no unexpanded globs in cmd contexts.
- Never open a new visible shell window for non-interactive work. Direct commands in
  the current terminal are fine; use `Start-Job` or `Start-Process -WindowStyle Hidden`
  only when background or separate-process execution is needed.
- **Subagents do not read AGENTS.md.** Any rule not inlined in the brief does not exist for them.

---

## Orchestration mode

Break large tasks into bounded work packets. Delegate; synthesize. Spawn subagents when the user requests it or parallelism is clearly beneficial.

**Codex agent profiles** (if used): `executor` (implementation), `explorer_worker` (read-only), `code-reviewer`, `red-team` under `~/.codex/agents/`.

**Delegation rules:**
- Each brief must include: objective, owned files, do/do-not, acceptance criteria, and the Windows shell rules above.
- Assign disjoint file ownership. Never let two executors edit the same file.
- Review worker output before merging conclusions.
- At failure threshold or high-risk action: pause and return to the human.

---

## File search

Prefer the workspace’s indexed search MCP when available (e.g. FFF: `mcp__fff__*`, never `custom_mcp__fff__*`).

**Use indexed search first** for content and file discovery inside the indexed workspace. Shell `rg` / `Select-String` is fallback only — state the reason:
- Target is outside the indexed workspace → say so, then `rg "pattern" "<absolute-path>"`.
- Indexed search returns empty or wrong for a known filename → say so, then `rg`.
- Mechanical shell ops where search does not apply (bulk rename, archive, process spawn) → state reason.

`rg` fallback: `rg "pattern" "<absolute-path>"` — never `rg -LiteralPath`.

---

## Skill routing

Read a skill’s `SKILL.md` fully before acting. Skills live under `skills/` in this hub.

Routing decisions belong to live skill catalog descriptions. Do not duplicate routing tables here.

**Capability preflight** (mandatory before creating, merging, forking, or substantially expanding a skill):

```powershell
node "$env:USERPROFILE\.agents\skills\skill-ratchet\scripts\skill-ratchet.mjs" preflight --query "<capability>" --json
```

(Adjust the path if this hub is installed elsewhere.) The command inventories candidates only; read every `plausible: true` match and record `REUSE` / `EXTEND` / `MERGE` / `CREATE` with evidence. `CREATE` only after rejecting plausible matches. On `NO_MATCHES`, inspect at most the top three near-matches. No new skill folder until `CREATE` is justified.

---

## External actions boundary

- **Read-only browsing and tool discovery** are allowed without explicit approval (web search, docs, listing tools/MCPs).
- **External mutations** (write to external services, push remotes, create issues, post messages) require explicit user authority. Where possible, read back the result to confirm it landed.
- Vault/Obsidian: `rules/vault-notes.mdc` is canonical when present. Maintenance hooks must not create notes or open Obsidian unsolicited.
- Issue trackers: create issues only when explicitly instructed. Reuse existing IDs when continuing work.

---

## Learning law (`extract-approach` → `memory/`)

Before claiming done on a nontrivial debug/fix/tooling gotcha, run the
`extract-approach` trigger gate. Prefer a short `memory/notes/` entry over skipping
when the insight might help a future agent. Skip routine work or when `MEMORY.md`
already has the same rule.

## Knowledge consult (`knowledge/`)

`knowledge/` does not run by itself — agents must open it. Before nontrivial work
in an unfamiliar domain:

1. Skim `knowledge/INDEX.md` (or `index.json`) for a matching entry when those files exist.
2. Load only the hit(s); do not dump the whole tree into context.
3. After a stable, non-session-specific fact is established, add/update knowledge and run `node knowledge/build-index.mjs` — or file an episode under `memory/` via `extract-approach` first.

---

## Documentation policy

- Code, types, and tests are the primary specification. Delete what-docs. Keep why-docs.
- ADRs are canonical for decisions; do not repeat rationale in inline comments or READMEs.
- Navigation docs stay thin: entry points and cross-references only.

---

## Do-not list

- Do not commit or push without explicit user instruction.
- Do not `git push --force` unless explicitly requested.
- Do not let two executors edit the same file.
- Do not claim "done" without evidence.
- Do not modify harness or user-level config without explicit user instruction
  (e.g. `~/.codex/config.toml`, Claude/`CLAUDE.md` pointers, Cursor `hooks.json` /
  `settings.json`, or equivalent tool configs).
