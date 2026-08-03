# Agent Hub — AGENTS.md

Voice and worldview: `SOUL.md` (**canonical** — `C:\Users\ws\.agents\SOUL.md` only; do not maintain tool-local SOUL forks).
Shared vocabulary: `CONTEXT.md`. RTK proxy: `RTK.md`.
**Precedence:** explicit user prompt > project `AGENTS.md` > this file > skills.

**Active tools:** Codex, Claude Code, Cursor, Grok.

---

## Strong-model guidance

- **Outcome + constraints + verification** — state what you will produce, what you won't touch, how you will prove it done.
- **No process theater.** Don't recap plans longer than the task; don't ask before acting on clearly-scoped work.
- **Plan proportional to risk.** Trivial fix → no plan. Cross-module or destructive → brief plan. Multi-owner → structured plan.
- **Verify before claiming done.** Tests green, screenshot when UI changed, gate command output in evidence.

---

## Windows shell (hard — inline in every worker brief)

- All shell via PowerShell (`pwsh`). Never cmd/bash for agent work.
- No `;` chaining outside PowerShell (cmd treats `;` as a literal argument).
- No `$null` redirect outside PowerShell; use `Out-Null` or `NUL`.
- No `ls`; no unexpanded globs in cmd contexts.
- Never open a new visible shell window for non-interactive work. Direct commands in
  the current terminal are fine; use `Start-Job` or `Start-Process -WindowStyle Hidden`
  only when background or separate-process execution is needed.
- **Subagents do not read AGENTS.md. Any rule not inlined in the brief does not exist for them.**

---

## Orchestration mode

Break large tasks into bounded work packets. Delegate; synthesize. Spawn subagents when the user requests it or parallelism is clearly beneficial.

Use the active host's available worker profiles for implementation, read-only
exploration, review, and adversarial analysis. Host-specific profile names and
paths belong in the host-local instructions.

**Delegation rules:**

- Each brief must include: objective, owned files, do/do-not, acceptance criteria, and the Windows shell rules above.
- Assign disjoint file ownership. Never let two executors edit the same file.
- Review worker output before merging conclusions.
- At failure threshold or high-risk action: pause and return to human.

---

## FFF file search (default for indexed content)

Tool family: `mcp__fff__*` (find_files, grep, multi_grep). Never `custom_mcp__fff__*`.

**Use FFF first** for all content and file discovery when the target is within the indexed workspace. Shell `rg`/`Select-String`/recursive file discovery is a fallback only — state the explicit reason before using it:

- Target is clearly outside the indexed workspace (e.g. `C:\Users\ws\.agents\` when cwd is a project repo) → state "target outside FFF index", fall back to `rg "pattern" "C:\explicit\path"`.
- FFF returns empty or mismatched for a known filename → state "target outside FFF index", fall back to `rg`.
- Mechanical shell operation where FFF does not apply (bulk rename, archive, process spawn) → state reason.

`rg` fallback syntax: `rg "pattern" "C:\explicit\path"` — never `rg -LiteralPath`.

---

## Skill routing

Read a skill's `SKILL.md` fully before acting. Skills:
`C:\Users\ws\.agents\skills\`. `skills/superpowers/` is vendored — **do not edit**.

Routing decisions belong to the live skill catalog descriptions. Do not
duplicate individual skill routing tables here.

### Overlapping skill matches

When multiple skills match the same request:

1. Prefer the skill that owns the request's domain or end-to-end lifecycle over
   a generic capability skill.
2. Prefer an orchestrating skill that explicitly covers or composes all
   requested operations.
3. Generic capability skills may only take ownership when no more specific
   domain or lifecycle skill matches.
4. Do not open a generic capability skill before reading the owning
   orchestrator's `SKILL.md`.
5. Follow composition and handoff rules declared by the owning orchestrator.
6. A word in the request matching a generic skill name does not override a more
   specific domain owner.

Examples:

- GitHub issue or pull-request work is owned by `shipping-github`.
- A GitHub PR request containing review, simplify, cleanup, deduplication,
  security review, CI monitoring, comments, or merging starts with
  `shipping-github/SKILL.md`.
- For a combined full-review and simplify request,
  `shipping-github/SKILL.md` decides how simplification is composed.
- Standalone local code simplification with no GitHub issue or PR lifecycle may
  route directly to `simplify`.

### Capability preflight

Before creating, merging, forking, or substantially expanding a skill, run:

`$env:USERPROFILE\.agents\skills\jk\jk-effective-agent-skills\scripts\capability-preflight.ps1`

The script inventories candidates only. Read the plausible routers it surfaces
and record the final decision: `REUSE / EXTEND / MERGE / CREATE` with evidence.

`CREATE` is only valid after rejecting plausible matches with evidence. On
`NO_MATCHES`, inspect at most the top three ranked near-matches before
`CREATE`. No new skill folder until `CREATE` is justified.

---

## External actions boundary

- **Read-only browsing and tool discovery are allowed** without explicit approval (web search, reading docs, listing available tools/MCPs).
- **External mutations** (writing to external services, pushing to remotes, creating issues, posting messages) require explicit user authority. Where possible, read back the result to confirm it landed correctly.
- Vault/Obsidian: `rules/vault-notes.mdc` is canonical. SessionStart hook reports maintenance only; never creates notes or opens Obsidian.
- Linear: create issues only when explicitly instructed. Use existing IDs when continuing work.

---

## Learning law (extract-approach → memory/)

Before claiming done on a nontrivial debug/fix/tooling gotcha, run the
`extract-approach` trigger gate (read that skill). Prefer writing a short
`memory/notes/` entry over skipping when the insight might help a future agent.
Skip only for routine work or when `MEMORY.md` already has the same rule.

## Knowledge consult (knowledge/)

`knowledge/` does not “run” by itself — agents must open it. Before nontrivial
work in an unfamiliar domain (design systems, security catalogs, stack choices):

1. Skim `knowledge/INDEX.md` (or `index.json`) for a matching entry.
2. Load only the hit(s); do not dump the whole tree into context.
3. After a stable fact is established that is not session-specific, add/update a
   knowledge entry and run `node knowledge/build-index.mjs` — or file it under
   `memory/` first via extract-approach if it is still an episode.

---

## Documentation policy

- Code, types, and tests are the primary specification. Delete what-docs. Keep why-docs.
- ADRs are canonical for decisions; do not repeat rationale in inline comments or READMEs.
- Navigation docs stay thin: entry points and cross-references only.

---

## Do-not list

- Do not edit `skills/superpowers/` — vendored, read-only.
- Do not commit or push without explicit user instruction.
- Do not `git push --force` unless explicitly requested.
- Do not let two executors edit the same file.
- Do not claim "done" without evidence.
