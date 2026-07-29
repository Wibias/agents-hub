---
name: code-simplification
description: >-
  Refactors existing working code for readability and reduced cognitive load without changing behavior: guard clauses over nesting, descriptive names, extraction of duplicated logic, removal of dead/speculative code. Use when code works but is harder to read than it should be, or when reviewing accumulated complexity. Not an over-engineering filter (use ponytail-review), not a full architectural restructure (use improve-codebase-architecture).
disable-model-invocation: true
---

# Code Simplification

> Adapted from [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) (MIT). Inspired by Anthropic's code-simplifier plugin.

## Overview

Simplify code by reducing complexity while preserving exact behavior. The goal is not fewer lines — it's code that is easier to read, understand, modify, and debug. Every simplification must pass: "Would a new team member understand this faster than the original?"

## When to Use

- After a feature works and tests pass, but the implementation feels heavier than needed
- During code review when readability or complexity issues are flagged
- Deep nesting, long functions, unclear names
- Refactoring code written under time pressure
- Consolidating scattered duplicate logic
- After merges that introduced duplication

**When NOT to use:**

- Code is already clean — don't simplify for its own sake
- You don't understand what the code does yet
- Performance-critical path where simpler version is measurably slower
- About to rewrite the module entirely

## The Five Principles

### 1. Preserve Behavior Exactly

All inputs, outputs, side effects, error behavior, and edge cases must remain identical. If unsure, don't make the change.

### 2. Follow Project Conventions

Read `AGENTS.md`, `.cursor/rules/*.mdc`, and neighboring code before simplifying. Simplification that breaks project consistency is churn.

### 3. Prefer Clarity Over Cleverness

Explicit code beats compact code that requires a mental pause.

### 4. Maintain Balance

Watch for over-simplification: inlining named helpers, merging unrelated logic, removing extensibility abstractions, optimizing for line count.

### 5. Scope to What Changed

Default to recently modified code. No drive-by refactors unless explicitly asked.

## The Simplification Process

### Step 1: Understand Before Touching (Chesterton's Fence)

Before changing or removing anything, understand why it exists:

- What is this code's responsibility?
- What calls it? What does it call?
- Edge cases and error paths?
- Tests defining expected behavior?
- Why written this way? (performance, platform, historical)
- Check git blame for original context

### Step 2: Identify Opportunities

**Structural:** deep nesting → guard clauses; long functions → split; nested ternaries → if/else or lookup; boolean flags → options object or separate functions.

**Naming:** generic (`data`, `result`) → descriptive; abbreviations → full words unless universal (`id`, `url`, `api`).

**Redundancy:** duplicated logic → extract; dead code → remove; wrapper adding no value → inline; speculative abstractions → remove.

### Step 3: Apply Incrementally

One simplification at a time. Run tests after each. **Separate refactoring PRs from feature/bugfix PRs.**

**Rule of 500:** If refactoring touches >500 lines, use codemods/AST transforms — not manual edits.

### Step 4: Verify the Result

- Genuinely easier to understand?
- Consistent with codebase?
- Clean, reviewable diff?
- Would a teammate approve?

If "simplified" is harder to follow, revert.

## Common Rationalizations

| Rationalization | Reality |
|---|---|
| "It's working, no need to touch it" | Hard-to-read working code costs on every future fix. |
| "Fewer lines is always simpler" | Comprehension speed matters, not line count. |
| "I'll simplify unrelated code too" | Unscoped simplification creates noisy diffs and regressions. |
| "I'll refactor while adding this feature" | Split changes — mixed PRs are harder to review and revert. |

## Verification

- [ ] All existing tests pass without modification
- [ ] Build and lint pass
- [ ] Incremental, reviewable changes only
- [ ] No error handling removed or weakened
- [ ] Follows `AGENTS.md` and project conventions
- [ ] Net improvement a reviewer would approve