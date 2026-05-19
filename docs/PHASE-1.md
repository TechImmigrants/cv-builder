# Phase 1: Resume Evaluation

**Owner:** Sahar Pakseresht (Product Lead)
**Target:** Ship MVP within 3 weeks of team alignment call
**Status:** Planning

---

## What We're Building

A single, focused feature: **paste your resume → get an honest, role-adaptive score with actionable feedback.**

Available on three surfaces simultaneously:
1. **Web UI**. Browser-based, no install needed.
2. **Telegram bot**. Send resume as file or text, get result back.
3. **CLI prompts**. Power users run their own LLM agent against our prompt pack.

## User Stories

### Non-technical job seeker (primary)
> "I'm applying to jobs and I don't know if my resume is good enough. I want honest, specific feedback, not generic advice."

- Opens the web UI or sends a file to the Telegram bot
- Pastes/uploads their resume (PDF, text, or markdown)
- Optionally pastes a job description (used as keyword-match context for the resume evaluation; full fit-scoring against a JD is Phase 2)
- Gets back: overall score (0 to 5), per-dimension breakdown, specific issues found, and flagged unsupported claims
- Takes under 30 seconds

### Developer / power user
> "I want full control. I'll use my own Claude Code / Codex / Gemini and my own API key."

- Clones the repo
- Points their AI coding agent at `apps/cli/`
- Runs the same evaluation locally, fully private
- No data leaves their machine

## What Ships

| Package | What's in it | Minimum viable |
|---|---|---|
| `schemas` | Zod types: Resume, JobDescription, Archetype, EvalResult, Claim, Issue | All defined and exported |
| `prompts` | Prompt templates: extract, score, validate-claims | 3 working prompts |
| `llm` | Provider-agnostic client | 1 adapter working (Anthropic) |
| `ingestion` | Resume + JD parsing | PDF + plain text working |
| `intelligence` | Rubric, archetypes, eval pipeline, validators | Fixed rubric v1, 3-5 archetypes |
| `eval` | Test harness | 5 golden fixtures passing in CI |
| `core` | Orchestrator | `runEvaluation()` end-to-end |
| `server` | HTTP API | `POST /eval`, `POST /parse` |
| `templates` | Placeholder directory for future render templates | Directory with README only (rendering is Phase 2) |
| `web-ui` | Browser interface | Paste resume + JD → see result |
| `telegram` | Bot | Send file → get result |
| `cli` | Prompt files + README | Power users can run locally |

## What We Are NOT Building (Phase 1)

This list is explicit and final. Do not start work on any of these until Phase 1 ships:

- Resume rewriting or tailoring
- Resume template editor in the UI (read-only template rendering only)
- Cover letter generation
- JD matching / fit scoring against a specific position (Phase 2)
- Clarification loops (system asking user follow-up questions)
- PDF export from our templates
- User accounts, auth, or saved history
- Vector search / RAG
- Multiple LLM provider support (one is enough to prove the contract)
- URL / JD scraping via Playwright (Phase 1.5+)
- Monetization, payments, premium tier
- Mobile app
- Analytics dashboard
- Job scraping or portal scanning

## Success Criteria

Phase 1 is done when ALL of these are true:

- [ ] User uploads PDF resume in web-ui → gets typed EvalResult in under 30s
- [ ] Same flow works via Telegram bot (file upload)
- [ ] Power user can run evaluation locally via CLI prompts
- [ ] `pnpm eval` passes 5+ golden fixtures in CI
- [ ] At least 3 archetypes implemented and tested with golden fixtures
- [ ] Each evaluation surfaces at least 3 specific issues with quoted resume text and a concrete fix suggestion
- [ ] Every EvalResult carries `rubricVersion` and `archetypeVersion`
- [ ] No LLM response reaches the UI without Zod validation
- [ ] Web UI works in at least 2 languages (EN + FA)
- [ ] Hosted mode is rate-limited (3 evaluations/day per IP, matching cvroast)
- [ ] Deployed and accessible (web UI has a public URL)

## Scoring Dimensions (from cvroast research)

The evaluation uses 6 dimensions with role-adaptive weights:

| Dimension | What it measures |
|---|---|
| Shipped Evidence | Real work in production with named tools and outcomes |
| Quantified Impact | Numbers in every bullet (scope, speed, adoption, savings) |
| Tech/Tool Visibility | Named technologies matching the role |
| ATS Compatibility | Single column, standard headings, parseable format |
| Keyword Match | Against JD if provided, else role-family keyword set |
| Public Proof Surface | GitHub, portfolio, blog, LinkedIn visibility |

Weights shift by role family (e.g., Designers get 40% on Public Proof, SWEs get 30% on Shipped Evidence). Full weight matrix in `packages/intelligence/archetypes/`.

## Archetypes for v1 (minimum 3-5)

Starting set based on team composition and community needs:

1. **Software Engineer** (Frontend/Backend/Full-stack)
2. **Product Manager**
3. **Data & ML Engineer**
4. **DevOps / SRE**
5. **Design** (if time permits)

More archetypes added in later phases based on user demand.

## Team Structure

See [TEAM.md](./TEAM.md) for the full team structure with specific assignments, working agreements, and how to get started.

## Timeline

| Week | Milestone |
|---|---|
| Week 0 | Architecture merged (done), Phase 1 plan shared, team call held |
| Week 1 | `schemas` + `prompts` + `llm` + `ingestion` + `intelligence` working locally. Golden fixtures defined. |
| Week 2 | `core` (orchestrator, depends on Week 1) + `web-ui` + `telegram` + `server` + `cli` connected. End-to-end flow working. All can start in parallel once interfaces from Week 1 are defined. |
| Week 3 | Polish, deploy, 5 golden fixtures green in CI. Public launch. |

## Relationship to cvroast.dev

[cvroast.dev](https://cvroast.dev) is our existing deployed product (Cloudflare Workers, ~15s evaluation). cv-builder Phase 1 rebuilds this capability on a proper architecture that supports:
- Multiple interfaces (web + Telegram + CLI)
- Structured, testable evaluation (Zod schemas, golden fixtures)
- Community contribution (modular packages anyone can work on)
- Future phases (tailoring, templates, JD matching)

cvroast.dev stays live as-is until cv-builder Phase 1 is deployed and validated. Then we decide whether to migrate the domain or run both.

## Open Questions for Team Call

These need a decision before implementation starts. The team call resolves them:

1. **Deployment target.** Cloudflare Workers (cvroast pattern, fast, edge), Vercel (easy Next.js), or self-hosted Fastify (matches architecture, full control)? Each has trade-offs on cost, latency, and ops burden.
2. **LLM provider lock-in.** This doc commits to Anthropic for the v1 adapter. `V1_SCOPE.md` leaves it TBD. If the team prefers OpenAI or Ollama for the first adapter, decide here and align both docs.
3. **Locales.** EN + FA proposed (matches the team's first audience). Confirm or adjust before Tolgee strings are written.
4. **Free-tier rate limit.** 3 evaluations/day/IP matches cvroast. Adjust if the team has a different budget posture.

## Risks

| Risk | Mitigation |
|---|---|
| Scope creep (Ali's warning) | This doc is the boundary. Nothing ships that isn't listed above. |
| Team energy drops | Ship in 3 weeks, not months. Quick wins keep momentum. |
| PDF parsing unreliable | Accept "best-effort partial" in v1. Plain text always works. |
| LLM costs for hosted mode | Rate limit (3/day free like cvroast). Evaluate cost after launch. |
| Too many packages for v1 | Packages can start as single files. The architecture is the boundary, not the file count. |

---

*This document is the product spec for Phase 1. Technical details in [ARCHITECTURE.md](./ARCHITECTURE.md) and [V1_SCOPE.md](./V1_SCOPE.md).*
