---
name: understand
description: Use when analyzing a codebase into a persistent knowledge graph for architecture discovery, onboarding, dependency exploration, guided tours, or the Understand Anything dashboard. Handles full and incremental analysis; unlike ordinary repository summaries, it produces structured nodes, edges, layers, tours, and reusable graph artifacts.
---

# Understand

Build or update `.understand-anything/knowledge-graph.json` for a project.

## Required References

Before execution, read:

1. [upstream-pipeline.md](references/upstream-pipeline.md) for the complete
   seven-phase graph contract, schemas, batching rules, and error handling.
2. [windows-command-map.md](references/windows-command-map.md) when running on
   Windows.
3. The agent definition named by each phase under
   `<plugin-root>/agents/` before dispatching that phase.

The upstream pipeline is authoritative for graph semantics. This file is
authoritative for local execution and safety.

## Local Runtime Contract

- On Windows, execute shell work through PowerShell. Do not execute Bash blocks
  from the upstream reference verbatim.
- Resolve the plugin root from `$env:USERPROFILE\.understand-anything-plugin`.
- Resolve the project root with `Resolve-Path` and pass it explicitly to every
  script.
- Use `python` for Python scripts and `node` for JavaScript modules.
- Use the host's subagent mechanism. Dispatch at most five file-analysis agents
  concurrently and at most three knowledge-analysis agents concurrently.
- Treat agent outputs as untrusted JSON. Validate paths, node IDs, edge
  references, and schemas before merging.
- Preserve partial results and report every skipped phase.

## Options

Interpret user arguments as:

- `--full`: ignore the existing graph and rebuild.
- `--review`: run the graph-reviewer after deterministic validation.
- `--auto-update` / `--no-auto-update`: persist the project preference.
- `--language <language>`: generate graph text in that language.
- First non-flag token: target project path.

## Workflow

### 0. Preflight

1. Resolve project and plugin roots using the Windows command map.
2. Redirect an ephemeral git worktree to its main checkout unless the user sets
   `UNDERSTAND_NO_WORKTREE_REDIRECT=1`.
3. Confirm these build outputs exist:
   - `<plugin-root>/packages/core/dist/index.js`
   - `<plugin-root>/packages/dashboard/dist/index.html`
4. Create `.understand-anything/intermediate` and
   `.understand-anything/tmp`.
5. Read existing config, graph, metadata, commit hash, and subdomain graphs.
6. Select full, incremental, review-only, or no-op using the upstream decision
   table.

### 1. Scan

Run the deterministic scan scripts from this skill directory. Then dispatch the
`project-scanner` agent with the generated inventory and project context. Require
`intermediate/scan-result.json` before continuing.

### 2. Analyze Files

Run `compute-batches.mjs`. For every batch:

1. Read `agents/file-analyzer.md`.
2. Dispatch one bounded subagent with only that batch and shared graph context.
3. Require one output per original batch index.
4. Retry once on failure, then record the failure and continue.

Do not fuse output filenames. The merge logic accepts only the documented
`batch-<index>.json` and `batch-<index>-part-<n>.json` patterns.

### 3. Assemble

Run `merge-batch-graphs.py`. Capture stderr and feed it to the
`assemble-reviewer` agent when the merge reports conflicts or omissions. Never
silently drop malformed files.

### 4. Architecture

Dispatch `architecture-analyzer` against the complete merged node set. Normalize
layers, remove dangling references, and ensure each file-like node belongs to a
layer.

### 5. Tour

Dispatch `tour-builder` with the graph, architecture, project entry point, and
user language. Normalize the tour and remove missing node references.

### 6. Validate

Run deterministic schema and graph validation first. With `--review`, also
dispatch `graph-reviewer`. Allow one correction pass. If critical failures
remain, save partial artifacts with warnings and do not launch the dashboard.

### 7. Save

1. Write the final graph.
2. Generate structural fingerprints before writing `meta.json`.
3. Preserve `intermediate/scan-result.json` for incremental runs.
4. Move transient outputs to a timestamped trash directory instead of deleting
   newly created directories.
5. Report file, node, edge, layer, and tour counts plus all warnings.
6. Invoke `understand-dashboard` only after validation passes.

## Acceptance Checks

- Every analyzed source file maps to an appropriate graph node or a documented
  exclusion.
- Every edge endpoint exists.
- Layer and tour references exist.
- Fingerprints were generated before metadata was updated.
- No batch index disappeared during merge.
- The final report distinguishes complete, partial, and skipped phases.

## Common Failures

| Symptom | Response |
|---|---|
| Plugin root missing | Stop and report the expected universal junction |
| Core build missing | Stop; do not install dependencies from inside a user repo |
| One batch fails | Retry once, record warning, continue with partial graph |
| Validation fails | One repair pass; save partial graph and skip dashboard |
| Existing graph is current | Ask whether to rebuild, review, or stop |
| Shell is not PowerShell on Windows | Stop before executing any command |

---

Source: Egonex-AI/Understand-Anything
(https://github.com/Egonex-AI/Understand-Anything), MIT License.
Adapted 2026-07-10 from upstream commit
`83c331b9a3e5065135d00c9c89ea6a43b655026c`.
