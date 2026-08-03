---
name: git-workflow-and-versioning
description: >-
  Use for commit planning and authoring, commit messages, branch organization,
  semantic-version decisions, release preparation, release tags, and changelog
  authoring. Do not use for GitHub issue or pull-request lifecycle work,
  including PR review, CI monitoring, PR branch updates, conflict resolution,
  merge readiness, or GitHub merging; those are owned by shipping-github.
  Distinct from setup-pre-commit for hook installation and
  superpowers:using-git-worktrees for worktree mechanics.
---

# Git Workflow and Versioning

Own the repository's commit, branch, versioning, tagging, and changelog
discipline. Follow repository conventions before applying generic guidance.

> Source: addyosmani/agent-skills
> (https://github.com/addyosmani/agent-skills), MIT License.
> Adapted 2026-07-10.

## Ownership boundary

This skill does not own GitHub issue or pull-request workflows.

When a GitHub issue or PR is involved, start with `shipping-github`.
`shipping-github` owns PR branch updates, conflict resolution, reviews, CI,
readiness, and merging. It may hand off only commit-message, commit-structure,
versioning, tagging, changelog, or release-authoring work to this skill.

Do not load this skill merely because a coding task may eventually be committed.

## Route

| Request shape                                                   | Workflow section                |
| --------------------------------------------------------------- | ------------------------------- |
| Plan or author commits; improve commit messages                 | Commit discipline               |
| Create or organize local branches                              | Branch discipline               |
| Decide MAJOR / MINOR / PATCH                                   | Semantic versioning             |
| Prepare a release tag                                          | Release tags                    |
| Write or update a human-facing changelog                        | Changelog authoring             |
| GitHub PR review, update, conflict, readiness, watch, or merge  | Hand off to `shipping-github`   |
| Worktree creation or worktree mechanics                         | Hand off to `using-git-worktrees` |
| Hook installation or pre-commit setup                           | Hand off to `setup-pre-commit`  |

If the request spans multiple rows, apply the relevant sections in order.

## Hard rules

1. Repository policy wins. Inspect existing contribution guides, commit
   conventions, release automation, branch naming, version files, tags, and
   changelog format before applying defaults.
2. Never commit, tag, push, rewrite history, or publish a release without
   explicit user authority.
3. Never force-push unless explicitly requested and the active policy permits
   it.
4. Stop on unrelated dirty changes. Never stage files outside the approved
   change.
5. Review the staged diff before every commit.
6. Verify required tests and checks before claiming a commit or release is
   ready.
7. Never commit secrets, credentials, private keys, `.env` files, build output,
   dependency caches, or editor-specific files unless the repository explicitly
   requires them.
8. Keep behavior changes, refactors, formatting, generated output, and
   dependency updates separate when that improves reviewability or rollback.
9. Commit and PR size are judgment calls, not line-count targets. Split work by
   coherent behavior, ownership, risk, and reviewability.
10. Do not invent a trunk-based workflow, branch prefix, Conventional Commit
    format, SemVer policy, or changelog structure when the repository already
    defines a different contract.

## Commit discipline

### Understand the intended history

Before committing:

- inspect the complete working-tree and staged diffs;
- identify unrelated or accidental changes;
- determine the repository's commit-message convention;
- group changes by coherent purpose and rollback boundary;
- verify generated files against their authoritative sources.

### Atomic commits

Each commit should represent one reviewable, reversible unit of intent.

Good separation commonly includes:

- behavior change and its tests;
- refactor required before the behavior change;
- generated output associated with its source change;
- documentation or migration guidance;
- dependency or tooling changes.

Do not split mechanically by file count or line count. Do not combine unrelated
changes merely because they were implemented together.

### Commit messages

Follow the repository's existing convention. When no convention exists, use:

```text
<type>: <short description>

<optional body explaining intent, trade-offs, and user impact>
```

Common types include `feat`, `fix`, `refactor`, `test`, `docs`, `build`, and
`chore`, but repository-defined types take precedence.

Messages should explain why the change exists and what observable outcome it
creates. Avoid messages such as `fix`, `update`, `misc`, or filenames alone.

### Pre-commit verification

At minimum:

- inspect `git diff --staged`;
- verify no unrelated paths are staged;
- scan the staged diff for secrets and credentials;
- run the repository's required focused and full checks;
- confirm generated files and lockfiles are intentional;
- confirm the commit message matches the actual staged change.

## Branch discipline

Follow repository conventions for branch names and integration strategy.

When no convention exists:

- use short-lived branches scoped to one coherent outcome;
- choose a descriptive prefix such as `feat/`, `fix/`, `refactor/`, or `chore/`;
- avoid long-lived branches that accumulate unrelated changes;
- prefer feature flags when incomplete work must integrate safely.

Do not assume the default branch is named `main`; detect it.

This section does not own PR branch updates or conflict resolution. When a
branch is attached to a GitHub PR, `shipping-github` is authoritative.

## Semantic versioning

First determine whether the project actually uses Semantic Versioning and where
its public compatibility contract is defined.

When SemVer applies:

```text
MAJOR  incompatible public behavior or API change
MINOR  backward-compatible functionality
PATCH  backward-compatible correction
```

Assess compatibility from the consumer's perspective, including APIs, schemas,
CLI behavior, configuration, persistence, events, generated output, and
documented guarantees.

Do not automatically choose MAJOR merely because uncertainty exists. Investigate
the observable contract and clearly report unresolved compatibility risk.

Update every authoritative version surface required by the repository. Do not
hand-edit generated or derived versions when automation owns them.

## Release tags

Before tagging:

- verify the target commit;
- verify required release checks;
- verify the version and tag format;
- confirm the tag does not already exist locally or remotely;
- confirm changelog and migration guidance are complete;
- obtain explicit authority to create and push the tag.

Use annotated tags when the repository expects them.

Do not push a tag or publish a release merely because a tag was prepared.

## Changelog authoring

A changelog is curated consumer-facing release information, not a raw commit
log.

Follow the existing project format. When no format exists, group entries under
relevant headings such as:

- Added
- Changed
- Fixed
- Deprecated
- Removed
- Security

Describe observable impact. Include migration instructions for breaking changes
and meaningful deprecations. Avoid implementation details that do not affect
consumers.

Write changelog content while the behavior and impact are still understood, but
do not publish or commit it without authority.

## Change summary

After modifying commit, versioning, tag, or changelog artifacts, report:

```text
CHANGES MADE:
- <path or Git object>: <what changed and why>

NOT CHANGED:
- <related item intentionally left untouched>

VERIFICATION:
- <checks performed and result>

RISKS OR FOLLOW-UPS:
- <remaining uncertainty or required next action>
```

## Verification

### Commit

- [ ] Staged diff contains only the intended coherent change.
- [ ] Commit message follows repository conventions and explains intent.
- [ ] Required tests and checks pass.
- [ ] No secrets or unintended generated files are present.
- [ ] No unrelated changes were staged or committed.

### Version or release

- [ ] The repository's versioning policy was identified.
- [ ] Compatibility impact supports the selected bump.
- [ ] Every authoritative version surface is consistent.
- [ ] Required release checks pass.
- [ ] Changelog and migration guidance match observable impact.
- [ ] The tag or release action has explicit user authority.
