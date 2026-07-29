# Tracker Write Authority

**Default: all outputs are local drafts.** This skill must never file, update, or close tracker items without explicit user authority.

## Core Rules

- QA clear reports, triage notes, and issue breakdowns are written as local drafts unless the user explicitly granted issue-creation authority for the current task.
- "Explicit authority" means the user named the tracker action in the current message or an earlier instruction recorded in durable manager state (e.g. "file this as a GitHub issue", "create Linear tickets", "close it").
- Durable recorded prior authority counts. One approval is enough; do not re-ask when authority already exists.
- When explicit authority is present, publish without asking again for confirmation.
- When authority is absent, produce the artifact locally and offer to publish: "Ready to file -- say yes to create the issue."
- Do not block reads, triage analysis, or local draft creation on tracker availability.

## Linear Authority

Linear is optional. Before writing to Linear confirm all three:

1. The user explicitly authorized Linear creation for the current task.
2. The required team, project, and state values are resolved (not guessed).
3. The Composio Linear toolkit is available in the current environment.

If any of these is missing, produce a local draft and state what is needed to publish.
