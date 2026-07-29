---
name: git-workflow-and-versioning
description: >-
  Structures git workflow and semantic versioning practices for every code
  change. Use when committing, branching, resolving conflicts, or organizing
  work across parallel streams; and when cutting a release, choosing a semver
  bump, tagging, or writing a changelog. Distinct from setup-pre-commit
  (hook installation); this skill owns the commit discipline, branching strategy,
  versioning contract, and changelog authoring that apply to all code work.
---

# Git Workflow and Versioning

> Source: addyosmani/agent-skills (https://github.com/addyosmani/agent-skills), MIT License. Adapted 2026-07-10.

## Overview

Git is your safety net. Treat commits as save points, branches as sandboxes, and history as documentation. With AI agents generating code at high speed, disciplined version control keeps changes manageable, reviewable, and reversible.

## When to Use

Always. Every code change flows through git.

## Core Principles

### Trunk-Based Development (Recommended)

Keep `main` always deployable. Work in short-lived feature branches that merge back within 1-3 days. DORA research consistently shows trunk-based development correlates with high-performing engineering teams.

```
main --o--o--o--o--o--o--o--  (always deployable)
       \     /  \   /
        o--o      o           <- short-lived feature branches (1-3 days)
```

Dev branches are costs. Every day a branch lives, it accumulates merge risk. Feature flags are preferred over long-lived branches.

### 1. Commit Early, Commit Often

```
Work pattern:
  Implement slice -> Test -> Verify -> Commit -> Next slice
```

### 2. Atomic Commits

Each commit does one logical thing:

```
# Good
a1b2c3d Add task creation endpoint with validation
d4e5f6g Add task creation form component
h7i8j9k Connect form to API and add loading state
m1n2o3p Add task creation tests

# Bad
x1y2z3a Add task feature, fix sidebar, update deps, refactor utils
```

### 3. Descriptive Messages

```
<type>: <short description>

<optional body explaining why, not what>
```

Types: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`

```
# Good: Explains intent
feat: add email validation to registration endpoint

Prevents invalid email formats from reaching the database.
Uses Zod schema validation at the route handler level,
consistent with existing validation patterns in auth.ts.

# Bad
update auth.ts
```

### 4. Keep Concerns Separate

Don't combine formatting with behavior changes. Don't combine refactors with features.

```
# Good: Separate concerns
git commit -m "refactor: extract validation logic to shared utility"
git commit -m "feat: add phone number validation to registration"
```

### 5. Size Your Changes

Target ~100 lines per commit/PR. Changes over ~1000 lines should be split.

```
~100 lines  -> Easy to review, easy to revert
~300 lines  -> Acceptable for a single logical change
~1000 lines -> Split into smaller changes
```

## Branching Strategy

### Feature Branches

```
main (always deployable)
  |
  |-- feature/task-creation    <- one feature per branch
  |-- feature/user-settings    <- parallel work
  +-- fix/duplicate-tasks      <- bug fixes
```

Branch naming: `feature/<short-description>`, `fix/<short-description>`, `chore/<short-description>`, `refactor/<short-description>`

## The Save Point Pattern

```
Agent starts work
    |
    |-- Makes a change
    |   |-- Test passes? -> Commit -> Continue
    |   +-- Test fails? -> Revert to last commit -> Investigate
    |
    +-- Feature complete -> All commits form a clean history
```

`git reset --hard HEAD` takes you back to the last successful state.

## Change Summaries

After any modification, provide a structured summary:

```
CHANGES MADE:
- src/routes/tasks.ts: Added validation middleware to POST endpoint
- src/lib/validation.ts: Added TaskCreateSchema using Zod

THINGS I DIDN'T TOUCH (intentionally):
- src/routes/auth.ts: Has similar validation gap but out of scope
- src/middleware/error.ts: Error format could be improved (separate task)

POTENTIAL CONCERNS:
- The Zod schema is strict -- rejects extra fields. Confirm this is desired.
- Added zod as a dependency (72KB gzipped) -- already in package.json
```

## Pre-Commit Hygiene

```bash
git diff --staged
git diff --staged | grep -i "password\|secret\|api_key\|token"
npm test
npm run lint
npx tsc --noEmit
```

## Handling Generated Files

- Commit: `package-lock.json`, Prisma migrations (project expects them)
- Don't commit: `dist/`, `.next/`, `.env`, `.env.local`, `*.pem`, IDE config
- `.gitignore` must cover: `node_modules/`, `dist/`, `.env`, `.env.local`, `*.pem`

## Using Git for Debugging

```bash
# Find which commit introduced a bug
git bisect start
git bisect bad HEAD
git bisect good <known-good-commit>

# View recent changes
git log --oneline -20
git diff HEAD~5..HEAD -- src/

# Find who last changed a specific line
git blame src/services/task.ts

# Search commit messages
git log --grep="validation" --oneline
```

## Release & Versioning

Commits are how you track change; a version is how consumers track it. Once anything depends on your code, "latest on main" stops being a sufficient answer.

### Semantic Versioning

```
MAJOR  breaking change -- consumers must change their code to upgrade
MINOR  new functionality, backward-compatible -- safe to upgrade
PATCH  bug fix, backward-compatible -- safe to upgrade
```

When unsure whether a change is breaking, assume it is. A surprise major is far cheaper than a broken consumer.

### Tag the Release

```bash
git tag -a v1.4.0 -m "Release 1.4.0"
git push origin v1.4.0
```

Derive the version from the tag rather than hand-editing scattered files.

### Keep a Changelog Written for Humans

A changelog is not `git log`. It is the curated, consumer-facing answer to "what changed and do I care?" -- grouped by `Added / Changed / Fixed / Deprecated / Removed / Security`, newest on top.

```markdown
## [1.4.0] - 2025-06-12
### Added
- Bulk task import via CSV
### Fixed
- Timezone drift in recurring task due dates
### Deprecated
- `GET /v1/tasks/all` -- use the paginated `GET /v1/tasks` (removal in 2.0)
```

Write the entry in the same change that makes the change, while the impact is fresh. Breaking changes get a migration note and a deprecation window (see deprecation-and-migration skill).

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "I'll commit when the feature is done" | One giant commit is impossible to review, debug, or revert. |
| "The message doesn't matter" | Messages are documentation. Future agents and collaborators need them. |
| "I'll squash it all later" | Squashing destroys the development narrative. Prefer clean incremental commits. |
| "I don't need a .gitignore" | Until `.env` with production secrets gets committed. Set it up immediately. |
| "It's just a small fix, bump the patch" | Check what consumers can observe. A behavior change they relied on is a major. |
| "The changelog is just the commit log" | Commits are for you; the changelog is for consumers. |

## Red Flags

- Large uncommitted changes accumulating
- Commit messages like "fix", "update", "misc"
- Formatting changes mixed with behavior changes
- No `.gitignore` in the project
- Committing `node_modules/`, `.env`, or build artifacts
- Long-lived branches that diverge significantly from main
- Force-pushing to shared branches
- Breaking change shipped under a minor or patch version bump
- Release with no tag
- User-facing release with no changelog entry

## Verification

For every commit:
- [ ] Commit does one logical thing
- [ ] Message explains the why, follows type conventions
- [ ] Tests pass before committing
- [ ] No secrets in the diff
- [ ] No formatting-only changes mixed with behavior changes
- [ ] `.gitignore` covers standard exclusions

For every release (anything with consumers):
- [ ] Version bump matches the change: breaking -> major, additive -> minor, fix -> patch
- [ ] Release is tagged; version derived from tag, not hand-edited
- [ ] Changelog has a curated, human-readable entry for this version
