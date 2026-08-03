# Resolve Merge, Rebase, Cherry-Pick, or Revert Conflicts

Use this workflow when the active shipping workflow encounters Git conflicts.
`shipping-github` retains ownership of the overall task.

## 1. Inspect the operation

Determine:

- whether Git is currently merging, rebasing, cherry-picking, or reverting;
- the current branch, base, head, and operation state;
- every conflicted path;
- whether unrelated worktree changes are present.

Stop before modifying files when unrelated dirty changes, an unexpected branch,
an incorrect base, or an unclear operation state could cause data loss.

## 2. Recover both intents

For every conflict, inspect the primary evidence for both sides:

- conflicting commits and their messages;
- surrounding history;
- changed tests and specifications;
- linked PRs, issues, or review comments;
- the current base-tip implementation.

Do not resolve a conflict from marker text alone.

## 3. Resolve deliberately

Preserve both intents where they are compatible.

Where they are incompatible:

1. follow the goal of the owning shipping workflow;
2. preserve current base behavior unless the PR intentionally changes it;
3. do not invent unrelated behavior;
4. record any material trade-off or discarded behavior.

Never choose `ours` or `theirs` mechanically across the entire file or
operation.

## 4. Validate the resolution

After removing all conflict markers:

- inspect the complete resulting diff;
- confirm no intended changes disappeared;
- search for remaining conflict markers;
- run focused checks for the affected files;
- run the repository's required formatting, type, build, and test gates as
  required by the owning workflow.

Conflict resolution is not complete merely because Git accepts the files.

## 5. Continue safely

Stage only paths resolved as part of the active operation. Never stage unrelated
changes.

Continue a rebase, cherry-pick, or revert only when the active mutation mode and
user authority permit it.

Create or complete a merge commit only when commit authority is explicit.

Do not abort automatically. Abort or stop only when required to prevent data
loss, the operation was started incorrectly, the intended result cannot be
determined safely, or the owning workflow requires human input.

## 6. Return to the owning workflow

After the Git operation is complete, return to the current
`shipping-github` workflow.

The owning workflow must re-check:

- resulting diff and PR scope;
- compatibility with the latest base tip;
- required tests and CI;
- stale approvals and last-push policy;
- review threads and policy gates;
- the authoritative `ship-gate.mjs` result.

Resolving conflicts never establishes merge readiness by itself.