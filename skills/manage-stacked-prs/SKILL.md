---
name: manage-stacked-prs
description: >
  Manage GitHub stacked pull requests with gh and git: inspect the stack from
  PR bases, restack after parent drift or squash-merge, retarget bases via REST,
  merge bottom-up (bottom PR first, then children), refresh stack body blocks,
  and recover via backup refs / reflog with --force-with-lease. Use when the
  user asks to sync, restack, retarget, merge the stack, merge the bottom PR,
  walk child PRs up, or recover a PR stack. Do not use for: splitting a large
  branch into small reviewable PRs (use split-to-prs); opening a single pull
  request; writing commit messages; Graphite or ghstack unless the user names
  those tools.
---

# Manage Stacked PRs

Operate an **existing** GitHub PR stack with `gh` + `git`. Prefer PR `--base`
links as source of truth (works after squash-merge deletes parent branches).

Keep ordinary edits/commits on plain `git`. Use this skill only for stack
inspect, restack, retarget, merge order, and recovery.

## State check (always first)

```bash
gh auth status
git status -sb
gh repo view --json nameWithOwner,defaultBranchRef --jq '{repo:.nameWithOwner,trunk:.defaultBranchRef.name}'
```

If `gh` is unauthenticated or the cwd is not a git repo with a GitHub remote,
stop with an actionable error. Do not claim success.

## Inspect the stack

Prefer the deterministic inspector (loads only this when the task is inspect-only):

```bash
node "<skill-root>/scripts/inspect-stack.mjs"           # focus current branch if it is a PR head
node "<skill-root>/scripts/inspect-stack.mjs" --head <branch>
node "<skill-root>/scripts/inspect-stack.mjs" --all     # every multi-PR stack
```

Resolve `<skill-root>` to this skill's directory on disk. If Node is unavailable,
fall back to the manual algorithm below — do not invent a different graph.

### Manual algorithm (fallback)

1. `gh pr list --state open --limit 100 --json number,title,headRefName,baseRefName,url,isDraft`
2. Build edges: each PR is `headRefName → baseRefName`.
3. **Focus rule** (pick one, in order):
   - User named a PR number or head branch → take the connected component that contains it (walk up via `baseRefName` while the base is also an open PR head, then walk down).
   - Else if current branch is an open PR head → same connected component.
   - Else → print every chain with depth ≥ 2; summarize standalone trunk PRs as non-stacks.
4. Cap useful depth at **3**. If deeper, warn and recommend landing the bottom half first.
5. Report:

```text
Stack (bottom → top)
  #N  branch → base   title   url
Merge order: #bottom → … → #top
```

## Safety rules

- Never mutate trunk (`main` / `master` / `dev` / repo default).
- Mutating git history or remote PR bases: show the plan, wait for approval.
- After rewrite: `git push --force-with-lease` only — never bare `--force`.
- Before restacking a branch tip you may lose: create a local backup ref
  `refs/backup/<branch>-<unix-ts>` pointing at the pre-rebase tip.
- Prefer REST for base/title/body patches when `gh pr edit` fails (Projects classic):

```bash
gh api "repos/$OWNER/$REPO/pulls/$N" -X PATCH -f base="$PARENT_BRANCH"
```

## Restack

When a parent moves (review commits, rebase, or merge into trunk), walk
**bottom → top**. Load `references/restack.md` only when restacking.

Non-interactive rebase (agents cannot drive `rebase -i`):

```bash
git fetch origin
git update-ref "refs/backup/${CHILD}-$(date +%s)" "refs/heads/$CHILD"
git checkout "$CHILD"
git rebase "origin/$PARENT"
# resolve within this PR's concern only, then:
git push --force-with-lease
```

After a parent **squash-merges** into trunk: verify GitHub retargeted the child
base to trunk (`gh pr view $N --json baseRefName`), then rebase the child onto
`origin/$TRUNK` and push with lease.

## Merge bottom-up

Load `references/merge.md` only when merging.

1. Land the **bottom** open PR first (targets trunk).
2. Confirm children retarget (or PATCH base).
3. Restack the next child onto trunk, then merge.
4. Never merge a mid/top PR while its base is still a stack parent unless the
   user explicitly wants that (almost never).

Default merge method: whatever the repo uses; note squash implications for the
next restack (see `references/restack.md` scenario B).

## Recover (undo a bad restack)

“Undo” means restore a branch tip from a backup ref or reflog — not a journaled
multi-PR transaction.

```bash
git update-ref "refs/heads/$CHILD" "refs/backup/$CHILD-<ts>"   # preferred
# or: git reflog show "$CHILD"  →  git reset --hard <good-sha>  (only with explicit user approval)
git push --force-with-lease
```

If no backup ref exists, stop and ask before any `reset --hard`. Never “undo”
by force-pushing trunk.

## Validate after mutate

After every restack, retarget, merge, or recover:

1. Re-run inspect (`scripts/inspect-stack.mjs` or the manual algorithm).
2. Confirm each remaining open PR’s `baseRefName` matches the intended parent/trunk.
3. Confirm remote tips match the plan (`gh pr view` / `git ls-remote`).
4. Only then report success. If anything diverges, say what failed — no success claim.

## Stack body block

When refreshing PR bodies, keep a deterministic block (create or replace
between markers):

```markdown
<!-- stack:links:start -->
### Stack
- [x] #101
- [ ] #102
- [ ] **#103** 👈 current
<!-- stack:links:end -->
```

Checked = already merged. Bold + 👈 = the PR being viewed.

## Compose with / do not steal from

| Skill | Boundary |
|---|---|
| **split-to-prs** | Creating a new split from one pile of work → that skill. This one manages an existing stack. |
| Ordinary `gh pr create` | Single PR, no parent/child chain → do not load this skill. |

## Output

After any session (inspect or mutate):

```text
Action:    <inspect | restack | retarget | merge | recover>
Stack:     #a → #b → #c   (or: no multi-PR stack)
Changed:   <branches / PR bases / bodies / none>
Backups:   <refs created, if any>
Verified:  <re-inspect ok | n/a for inspect-only>
Next:      <what the user should do>
```

## References
<!-- eval:references -->
- references/restack.md -- when to read: parent moved, squash-merge landed, or trunk advanced under the stack
- references/merge.md -- when to read: merging any PR in a stack or choosing merge order
- tests/evals/cases.jsonl -- when to read: before discovery, execution, or adversarial evaluation
- tests/evals/regression-cases.jsonl -- when to read: before rerunning or appending retained regressions
- tests/evals/regression-lock.json -- when to read: when validating immutable retained regressions
<!-- /eval:references -->
