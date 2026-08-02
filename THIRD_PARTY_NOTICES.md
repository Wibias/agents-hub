# Third-Party Notices

This hub is MIT-licensed as a whole ([LICENSE](LICENSE), Copyright (c) 2026
Wibias). Some skills under `skills/` adapt or incorporate third-party material.
Those portions remain under their upstream licenses. Full license texts are in
[`licenses/`](licenses/).

Inline `Source:` / `Adapted from:` lines in individual `SKILL.md` files are for
agents at runtime; this file is the canonical redistribution notice.

## Adapted skills

| Hub skill | Upstream | License | Full text |
|-----------|----------|---------|-----------|
| `ai-agent-security` | [mukul975/Anthropic-Cybersecurity-Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills) | Apache-2.0 (Copyright (c) 2024-2025 Mahipal) | [licenses/mukul975-Anthropic-Cybersecurity-Skills-Apache-2.0.txt](licenses/mukul975-Anthropic-Cybersecurity-Skills-Apache-2.0.txt) |
| `code-simplification` | [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) (inspired by Anthropic code-simplifier; Anthropic material not redistributed here) | MIT | [licenses/addyosmani-agent-skills-MIT.txt](licenses/addyosmani-agent-skills-MIT.txt) |
| `context-engineering` | [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | MIT | [licenses/addyosmani-agent-skills-MIT.txt](licenses/addyosmani-agent-skills-MIT.txt) |
| `diagnose` | Diagnostic checklist adapted from [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | MIT | [licenses/addyosmani-agent-skills-MIT.txt](licenses/addyosmani-agent-skills-MIT.txt) |
| `git-workflow-and-versioning` | [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | MIT | [licenses/addyosmani-agent-skills-MIT.txt](licenses/addyosmani-agent-skills-MIT.txt) |
| `handoff` | [davidondrej/skills](https://github.com/davidondrej/skills) | MIT | [licenses/davidondrej-skills-MIT.txt](licenses/davidondrej-skills-MIT.txt) |
| `research-prompt` | [davidondrej/skills](https://github.com/davidondrej/skills) | MIT | [licenses/davidondrej-skills-MIT.txt](licenses/davidondrej-skills-MIT.txt) |
| `skill-ratchet` (checklist excerpts in `references/extended-checklists.md`) | [davidondrej/skills](https://github.com/davidondrej/skills) `effective-agent-skills` | MIT | [licenses/davidondrej-skills-MIT.txt](licenses/davidondrej-skills-MIT.txt) |
| `resolving-merge-conflicts` | [mattpocock/skills](https://github.com/mattpocock/skills) | MIT | [licenses/mattpocock-skills-MIT.txt](licenses/mattpocock-skills-MIT.txt) |
| `review` (smell baseline) | [mattpocock/skills](https://github.com/mattpocock/skills) | MIT | [licenses/mattpocock-skills-MIT.txt](licenses/mattpocock-skills-MIT.txt) |
| `understand` | [Egonex-AI/Understand-Anything](https://github.com/Egonex-AI/Understand-Anything) | MIT | [licenses/Egonex-AI-Understand-Anything-MIT.txt](licenses/Egonex-AI-Understand-Anything-MIT.txt) |
| `playwright` | [microsoft/playwright-cli](https://github.com/microsoft/playwright-cli) skill materials | Apache-2.0 | [licenses/microsoft-playwright-cli-Apache-2.0.txt](licenses/microsoft-playwright-cli-Apache-2.0.txt) |
| `react-doctor` | [millionco/react-doctor](https://github.com/millionco/react-doctor) skill materials | Modified MIT (see note below) | [licenses/millionco-react-doctor-Modified-MIT.txt](licenses/millionco-react-doctor-Modified-MIT.txt) |
| `pnpm`, `vite`, `vitest` | Generated via [antfu/skills](https://github.com/antfu/skills) from upstream project docs | MIT (generator); project docs retain their own licenses | [licenses/antfu-skills-MIT.txt](licenses/antfu-skills-MIT.txt) |

### Original Skill Ratchet work

Capability inventory/classification, Node CLI, evaluation contract, adversarial
schema, model-parity assertions, regression lock, and validators in
`skills/skill-ratchet/` are original to [Wibias/skill-ratchet](https://github.com/Wibias/skill-ratchet)
except the David Ondrej checklist excerpts noted above.

### `react-doctor` Modified MIT note

Million Software’s license is MIT plus restrictions on (1) using the software as
ML/AI training or evaluation data, and (2) selling/hosting it as a product whose
value derives substantially from that software. Those terms apply to the adapted
`react-doctor` skill materials. Contact founders@million.dev for permission
requests. See the full text in
[licenses/millionco-react-doctor-Modified-MIT.txt](licenses/millionco-react-doctor-Modified-MIT.txt).

### Other attributions (not full license copies)

| Hub skill | Material | Notes |
|-----------|----------|-------|
| `writing-ticks` | [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) | Condensed field guide; Wikipedia content is typically CC BY-SA — follow Wikipedia licensing if you redistribute substantial verbatim text |
| `improve-react` | React Doctor rule concepts | Workflow is original; rule bar references React Doctor (see `react-doctor` above) |
| `code-simplification` | Review-lens concepts from [bholmesdev/skills `simplify`](https://github.com/bholmesdev/skills/tree/main/skills/simplify) | Concepts only; wording and safety guards are original to this hub, and no upstream text or license file is redistributed |

## Hub-original skills

Skills not listed above (for example `extract-approach`, `manage-stacked-prs`,
`issue-workflow`, `ponytail-review`, `security-review`,
`improve-codebase-architecture`) are covered by this repository’s MIT
[LICENSE](LICENSE) unless a file says otherwise.
