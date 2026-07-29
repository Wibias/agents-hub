# pending-rules.md — staging for self-learning

Buffer between episodic memory (`notes/` + `MEMORY.md`) and durable
`rules/` or `knowledge/`.

Add a candidate when the **same lesson** has appeared in **≥ 3 sessions**.
A human decides whether and where it merges.

**No automatic writes** into this file.  
**Review signal:** if more than **5** open candidates pile up, schedule a cleanup.

---

## Format

| Candidate (behavior / fact) | Supporting sessions (≥ 3) | Target | Status |
|-----------------------------|---------------------------|--------|--------|
| _(example)_ "Verify tool behavior before trusting training recall" | 2026-01-15 (1/3) | `rules/` | observing |

**Statuses:** `observing` → `ready` → `merged` | `discarded`

---

## Candidates

_(Empty — no candidates with ≥ 3 supporting sessions yet.)_

---

## Merge flow (when ready)

1. Rewrite as a rule: "When [condition], then [action]."
2. Draft `rules/<name>.mdc`, or a knowledge entry if it is a stable fact.
3. Set status here to `merged` and link source note paths.
4. Set matching `MEMORY.md` rows to `merged`.
5. If knowledge changed: run `node knowledge/build-index.mjs`.
