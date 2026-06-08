# Phase 1 Team Structure

**Last updated:** 2026-05-19
**Owner:** Sahar Pakseresht (Product Lead)

This document maps contributors to modules for Phase 1 (Resume Evaluation MVP). Assignments are based on self-reported skills from the team introduction thread. See [PHASE-1.md](./PHASE-1.md) for scope and timeline.

---

## Modules & Assignments

### `schemas` + `core` — Foundation

| Role | Person |
|---|---|
| **Lead** | ABB (Amirbahadr) — Sr Lead Engineer @ smartlane.ai |
| Support | Mahdi Gh — Tech Lead, 13 yrs experience |

- Zod schemas, orchestrator, system design
- **Week 1 priority**: interfaces must be defined first so other teams can work in parallel
- Stack: TypeScript

### `web-ui` — Browser Interface (Next.js)

| Role | Person |
|---|---|
| **Lead** | Sobhan Yazdanjoo — Frontend Engineer @ Snapp, 6 yrs React/Next |
| Builder | Milad — Lead QA Automation @ Tecnotree, Node.js (author of PR #35) |
| Builder | Negin Ahmadi — Frontend, React/Next/TS |
| Builder | Ali Radmanesh — Frontend, TS/React/Next |
| Reviewer | Amir — Team Lead Front @ iranpaymex, React/Next/TS |
| Reviewer | AmirReza — Sr Frontend Dev @ ainfluencer, MERN |

- Build on Milad's Web UI PR (#35) as starting point
- 4 builders + 2 reviewers
- Stack: Next.js, React, Tailwind, TypeScript

### `server` — HTTP API (Fastify)

| Role | Person |
|---|---|
| **Lead** | Amin Sehati — Node/Nest + frontend experience |
| Builder | Ariana — Backend, TS/Python/PHP |
| Builder | Zia Nazari — Software Engineer, Go/Python/JS (Finland) |

- Thin API layer: `POST /eval`, `POST /parse`
- Stack: Fastify, TypeScript

### `intelligence` + `prompts` — Scoring Engine

| Role | Person |
|---|---|
| **Lead (product)** | Sahar — Evaluation framework, research, product direction |
| **Lead (technical)** | ABB — Architecture |
| Builder | FSHIN (Afshin) — AI & Robotics researcher (Europe) |
| Builder | Behnam — Security Engineer/Researcher (claim validation) |

- Rubrics, archetypes, validators, prompt templates
- Based on cvroast.dev research (250+ sources)
- Stack: TypeScript

### `llm` — Provider Adapters

| Role | Person |
|---|---|
| **Lead** | FSHIN (Afshin) — AI & Robotics researcher |
| Builder | Mohammad — AI, vision, NLP |
| Builder | Ali Hajqani — Vision + LLM, Python/TS |

- Provider-agnostic LLM client
- Phase 1 target: one working adapter (Anthropic)
- Stack: TypeScript

### `ingestion` — PDF & Text Parsing

| Role | Person |
|---|---|
| **Lead** | Niloofar Fallahian — 7 yrs dev, shifting to AI/LLM |
| Builder | Mojtaba Sohrabi — Software Engineer @ Maltina, Python |

- PDF to text extraction, format detection
- Phase 1 accepts "best-effort partial" for PDF; plain text always works
- Stack: TypeScript

### `eval` — Test Harness

| Role | Person |
|---|---|
| **Lead** | Milad — QA Automation is his specialty |
| Builder | All module leads contribute test cases for their own module |

- Golden fixtures, CI pipeline
- Target: 5+ golden fixtures passing in CI
- Stack: Vitest, TypeScript

---

## Advisors & Reviewers

Not assigned to a single module. Available for code review, architecture feedback, and mentorship.

| Person | Background |
|---|---|
| Farhad | Software Engineer @ Apple |
| Hamid Farmani | Software Engineer @ PayPal |
| Ali Sol | Backend Developer, 8 yrs (PHP/JS/TS) |
| Ali Asadi | Team Lead @ crypto exchange, Python |

---

## Available for Assignment

Contributors who can join a module based on interest and availability.

| Person | Stack | Suggested module |
|---|---|---|
| Reza | React frontend @ Swedish company | `web-ui` |
| Sobhan MP | Android, Java SpringBoot, Angular | `server` |
| Kaaveh Mohamedi | Android dev, content producer | `web-ui` (UX/copy) |
| Fatemeh Rostamipour | .NET, SQL Server | `eval` (fixtures, data) |
| Ali (Angular) | Angular frontend, Iran | `web-ui` (if Angular experience transfers) |

---

## Working Agreements

1. **One lead per module.** The lead owns PR reviews and technical decisions for their module.
2. **Nobody works alone.** Minimum 2 people per module.
3. **Week 1 is interfaces.** `schemas` + `core` defines the contracts. Everyone else scaffolds in parallel.
4. **The NOT DOING list is law.** See [PHASE-1.md](./PHASE-1.md). Nothing outside Phase 1 scope until MVP ships.
5. **3-week deadline.** Ship or it dies.
6. **All code in TypeScript.** No Python, no Go, no exceptions (see architecture discussion).
7. **PRs require at least one review** from the module lead or an advisor before merge.
8. **Communicate blockers early.** If you're stuck for more than a day, post in the group.

---

## How to Get Started

1. Read [PHASE-1.md](./PHASE-1.md) for what we're building and what we're NOT building.
2. Read [ARCHITECTURE.md](./ARCHITECTURE.md) for the technical design.
3. Find your module above and reach out to your lead.
4. Pick an issue from the [issue tracker](https://github.com/TechImmigrants/cv-builder/issues) tagged with your module.
5. If no issue exists for what you want to work on, open one first and get lead approval before coding.
