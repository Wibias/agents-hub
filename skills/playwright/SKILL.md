---
name: playwright
description: >-
  Automates a real browser via playwright-cli: open, snapshot, click, fill,
  screenshots, multi-tab, traces, video, request mocking, storage state. Use when
  the task needs browser automation, visual inspection, UI-flow debugging, or
  screenshots of a running app - even if the user does not say playwright.
  Prefer CLI over writing @playwright/test specs unless the user asks for tests.
  Source: microsoft/playwright-cli skill (merged with hub Windows wrappers).
---

# Playwright CLI

Drive a real browser from the terminal. Prefer the hub wrappers so `@playwright/cli`
works without a global install.

Upstream: [microsoft/playwright-cli](https://github.com/microsoft/playwright-cli).

## Skill path (Windows hub)

```powershell
$PW = "$env:USERPROFILE\.agents\skills\playwright\scripts\playwright_cli.ps1"
# or bash: .../playwright/scripts/playwright_cli.sh
```

Also works: `npx --yes --package @playwright/cli playwright-cli <args>`

## Prerequisite

```powershell
node --version
npm --version
# needs npx
```

Optional global: `npm install -g @playwright/cli@latest`

## Quick start

```powershell
pwsh -File $PW open https://playwright.dev --headed
pwsh -File $PW snapshot
pwsh -File $PW click e15
pwsh -File $PW type "Playwright"
pwsh -File $PW press Enter
pwsh -File $PW screenshot
pwsh -File $PW close
```

## Core workflow

1. `open` (optionally with URL)
2. `snapshot` - get stable refs (`e3`, `e15`, …)
3. Interact with **latest** snapshot refs
4. Re-snapshot after navigation / major DOM change
5. Artifacts: `screenshot`, `pdf`, `tracing-*`, `video-*` when useful

```powershell
pwsh -File $PW open https://example.com
pwsh -File $PW snapshot
pwsh -File $PW click e3
pwsh -File $PW snapshot
```

## Command groups (summary)

| Group | Examples |
|---|---|
| Core | open, goto, click, dblclick, type, fill, drag, drop, hover, select, upload, check, snapshot, find, eval, dialog-*, resize, close |
| Navigation | go-back, go-forward, reload |
| Keyboard | press, keydown, keyup |
| Mouse | mousemove, mousedown, mouseup, mousewheel |
| Save | screenshot, pdf |
| Tabs | tab-list, tab-new, tab-close, tab-select |
| Storage | state-save/load, cookie-*, localstorage-*, sessionstorage-* |
| Network | route, unroute, route-list |
| DevTools | console, requests, run-code, tracing-*, video-*, show --annotate, highlight, generate-locator |

Full command detail: [references/cli.md](references/cli.md) (hub) and specialized refs:

- [element-attributes.md](references/element-attributes.md)
- [running-code.md](references/running-code.md)
- [request-mocking.md](references/request-mocking.md)
- [session-management.md](references/session-management.md)
- [storage-state.md](references/storage-state.md)
- [tracing.md](references/tracing.md)
- [video-recording.md](references/video-recording.md)
- [test-generation.md](references/test-generation.md) / [playwright-tests.md](references/playwright-tests.md) - only when user wants tests
- [workflows.md](references/workflows.md) - patterns and troubleshooting

## Open options

```powershell
pwsh -File $PW open --browser=chrome   # chrome|firefox|webkit|msedge
pwsh -File $PW open --mobile
pwsh -File $PW open --device="iPhone 15"
pwsh -File $PW open --persistent
pwsh -File $PW open --headed
```

## Guardrails

- Always snapshot before using refs; re-snapshot when refs go stale
- Prefer explicit commands over `eval` / `run-code` unless needed
- Default to CLI automation, not Playwright test files
- Use `--headed` for visual checks
- Artifacts: prefer `output/playwright/` when writing into a project
- Hub shell: PowerShell (`pwsh`); do not assume bash

## Related hub skills

- UI screenshot verify rules: project `ui-screenshot-verify.mdc` when present
