---
name: extract-approach
description: >
  Capture a reusable decision rule into ~/.agents/memory after a verified solve
  that produced a non-obvious insight. Use at end of debugging, tricky fixes,
  host/tool gotchas, or any session where an assumption broke; also when the user
  says "extract approach", "write a learning", or "remember this". Prefer running
  the trigger gate over silently skipping. Do not use for routine CRUD, pure
  formatting, or restating existing docs.
---

# Extract approach

Capture only the new decision rule from a genuinely instructive solve. Task size,
elapsed time, and number of edited files are not evidence that something was learned.

**Default habit:** when you are about to claim a nontrivial fix/debug done, run
the trigger gate below. If all four are yes, write the note in the same turn —
do not wait for the user to ask.

## Trigger gate

Write or update a note only when every answer is **yes**:

1. Was a concrete problem actually solved and verified?
2. Did the solve change understanding through a specific surprise, broken
   assumption, hidden owner, undocumented constraint, or sharper decision rule?
3. Was that insight unavailable from existing docs, project patterns, and learning
   notes before the work began?
4. Can a future agent apply the insight to another case without replaying the full
   investigation?

If any answer is a clear **no**, stop without creating a note. If (1) is yes, the
fix was non-obvious, and you are only unsure on (2)–(4), **write a short note
anyway** and mark `Rules/Knowledge candidate?` as pending — better a thin
note than a lost lesson.

## Never trigger from effort alone

Skip these unless they independently pass the trigger gate:

- multi-file or large refactors
- lengthy implementations that followed established patterns
- standard architecture choices with known tradeoffs
- setup performed directly from accurate documentation
- audits, reviews, or research with no solved root cause
- failed or unverified attempts
- routine fixes, formatting, migrations, and status updates

If an existing learning already expresses the same rule, skip. Update it only when
the new solve materially changes, narrows, or invalidates the previous lesson.

## Output format

Write to `~/.agents/memory/notes/YYYY-MM-DD-<slug>.md` and register a row in
`~/.agents/memory/MEMORY.md` (Status: `active`). Do **not** write to `learnings/`
(merged into memory 2026-07-15).

```markdown
# <Problem title> (YYYY-MM-DD)

**Tool/context:** <Codex | Claude Code | Cursor | Grok | Multi>
**Tags:** <max 3 keywords>

## Observation
<What was the actual problem? Not the symptom -- the underlying issue.>

## Lesson
<The precise decision rule that was not known before this solve.>
<Recognition cues for a future agent.>

## Rules/Knowledge candidate?
<No | Yes -- pending-rules.md entry planned>

## Links
- <relevant repo-relative paths, issue numbers, docs>
```

## Rules

- One note per distinct reusable insight, not per task or session.
- State the new rule early; omit narrative chronology.
- Keep the note under 40 lines.
- Link durable repository paths or issue IDs; avoid machine-specific absolute paths.
- Always update `MEMORY.md` in the same change.

## Red flags — stop without writing

- "This took a long time."
- "Many files changed."
- "It was an architecture task."
- "This might be useful someday."
- "I should document everything before moving on."

All are effort signals, not learning signals.
