# Roadmap

This file tracks **what we're actively working on right now** and **what's
open for grabs**. For the **vision** (v0.1, v0.2, v0.3), see the
[README Roadmap section](README.md#roadmap). This file is the **current state**
— what maintainers and contributors are doing this week and next.

## How to read this

- 🚧 **In progress** — assigned, being worked on, has an ETA. Don't pick up
  unless you coordinate with the assignee.
- 🎯 **Up next** — open for grabs. Comment "I'll take this" on the linked
  issue to claim it. Every item here is sized for one PR.
- 🅿️ **Parked** — explicitly deprioritized for now. Pick up only after
  discussion with a maintainer.

**If you're a new contributor, start in 🎯 Up next.** Every item there has
an acceptance bar reachable in a single sitting (1–4 hours).

---

## 🚧 In progress

| Item | Owner | ETA | Notes |
|---|---|---|---|
| **Merge Phase-1 stack** — PRs [#68](https://github.com/TechImmigrants/cv-builder/pull/68), [#69](https://github.com/TechImmigrants/cv-builder/pull/69), [#70](https://github.com/TechImmigrants/cv-builder/pull/70), [#71](https://github.com/TechImmigrants/cv-builder/pull/71), [#72](https://github.com/TechImmigrants/cv-builder/pull/72), [#73](https://github.com/TechImmigrants/cv-builder/pull/73) | @saharpak | **ASAP** | Open since 2026-06-07. Currently the single biggest contributor-experience blocker — new contributors cloning `main` get a different product than what's documented. **Reviewer help urgently wanted — see below.** |
| CV/JD input screen with file upload — PR [#76](https://github.com/TechImmigrants/cv-builder/pull/76) | unassigned | TBD | Two-column input screen. Depends on Phase-1 merge. |
| CodeRabbit config expansion — PR [#75](https://github.com/TechImmigrants/cv-builder/pull/75) | unassigned | TBD | Per-package review guidance. |
| Rule: flag outdated technologies — PR [#74](https://github.com/TechImmigrants/cv-builder/pull/74) | unassigned | TBD | Resolves issue [#53](https://github.com/TechImmigrants/cv-builder/issues/53). |
| CI: web UI deploy previews on Cloudflare Pages — PR [#78](https://github.com/TechImmigrants/cv-builder/pull/78) | unassigned | TBD | Path-filtered workflow. |

> ### ⚠️ Reviewer help wanted on Phase-1 PRs
>
> The bottleneck isn't writing code — it's review bandwidth. If you have
> **TypeScript + zod** experience and can review one of #68–#73, comment on
> the PR. A 30-minute review from someone other than the maintainer unblocks
> the entire stack and signals to the rest of the contributor base that the
> project is moving.

---

## 🎯 Up next — open for grabs

These have linked issues, explicit acceptance criteria, and a one-PR-sized
scope. **Comment "I'll take this" on the issue to claim.**

| Item | Effort | Issue | Notes |
|---|---|---|---|
| Add integration test for full evaluation pipeline | M (2–4 h) | [#51](https://github.com/TechImmigrants/cv-builder/issues/51) | `help wanted`, `core`. End-to-end test of `evaluate()`. |
| Add GitHub Actions workflow for lint + tests | S (1–2 h) | [#46](https://github.com/TechImmigrants/cv-builder/issues/46) | `help wanted`, `core`. May already partially exist — check `.github/workflows/` first. |
| Convert `types.ts` to Zod schemas | M | [#47](https://github.com/TechImmigrants/cv-builder/issues/47) | `enhancement`, `core`. |
| Add example test CVs for local development | S (30–60 min) | [#50](https://github.com/TechImmigrants/cv-builder/issues/50) | `good first issue`. Author 2–3 fictional CVs + 1 JD. |
| Rule: flag generic summary / objective section | S | [#45](https://github.com/TechImmigrants/cv-builder/issues/45) | `good first issue`, `rules`. |
| Rule: detect missing action verbs in bullet points | S | [#52](https://github.com/TechImmigrants/cv-builder/issues/52) | `good first issue`, `rules`. |
| Rule: flag outdated technologies | S | [#53](https://github.com/TechImmigrants/cv-builder/issues/53) | `good first issue`, `rules`. **PR #74 already in flight — check before starting.** |
| Add per-dimension feedback strings to evaluator | S | [#48](https://github.com/TechImmigrants/cv-builder/issues/48) | `enhancement`, `core`. |
| Fix: flag missing contact information | S | [#55](https://github.com/TechImmigrants/cv-builder/pull/55) | `core`. PR already open — needs review. |
| New archetype: **AI Engineer** | M | (open issue) | Use the [New Archetype template](.github/ISSUE_TEMPLATE/new_archetype.md). Top priority for the 2026 market. |
| New archetype: **AI Product Manager** | M | (open issue) | Top priority for the 2026 market. |
| New archetypes: Backend / Frontend / DevOps | M each | (open issue) | Currently advertised in README but unimplemented. |
| Land CONTRIBUTING.md "no-code" section | S | (open issue) | The draft this file came from. |
| Write `docs/faq.md` ("I got a bad score, what now?") | S | (open issue) | |
| Write `docs/cli-troubleshooting.md` | S | (open issue) | |
| Write `docs/evaluation-glossary.md` | S | (open issue) | |

---

## 🅿️ Parked

| Item | Why parked | When to revisit |
|---|---|---|
| PDF export | Real effort; needs design decisions (template engine, fonts, ATS-safe output). | After Phase-1 merge + web UI MVP. |
| VS Code / Cursor extension | Significant scope; needs stable core API first. | After PDF export and at least 8 archetypes shipped. |
| Self-hosted deployment guide | Requires production stability first. | After v0.2 lands. |
| LLM-enhanced mode (rewrite suggestions) | Cost implications and prompt-design work. | After core scoring is stable. |
| Side-by-side tailoring editor | Needs mature web UI. | After web UI MVP ships. |
| Localization (multiple languages) — beyond README | Translation tooling, RTL support, glossary. | After first 3 README translations land. |
| Before/after examples library | Needs curation and editorial review. | After core scoring is stable. |

---

## How to influence this roadmap

- **Pick up an item from 🎯 Up next** — comment "I'll take this" on the issue.
- **Suggest new items** — open an issue with the relevant label.
- **Push a 🅿️ Parked item** — if you think something should be un-parked,
  open an issue with the `roadmap` label and the rationale.
- **Help review Phase-1 PRs** — the single highest-leverage thing a
  TypeScript-comfortable contributor can do this week.

---

*Last updated: 2026-06-22*
