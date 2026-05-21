# V1 Scope

## In scope

- `packages/schemas` — Resume, JobDescription, Archetype, EvalResult, Claim, Issue
- `packages/llm` — one adapter working end-to-end (provider TBD), Zod-validated structured outputs
- `packages/prompts` — extract, score, validate-claims prompts as `.md`
- `packages/ingestion` — PDF parser + plain-text/markdown parser
- `packages/intelligence` — fixed rubric (v1), 3–5 archetypes, eval pipeline, claim validator, ATS checker
- `packages/eval` — vitest harness + at least 5 golden fixtures
- `packages/core` — `runEvaluation()` orchestrator
- `packages/templates` — at least 1 template manifest (data layer, CLI-consumable) + its React renderer (read-only render is enough for v1)
- `apps/server` — `POST /eval`, `POST /parse`, `POST /telegram/webhook`
- `apps/web-ui` — paste/upload resume + JD → result view. Tolgee wired for at least 2 locales.
- `apps/telegram` — minimal bot: send resume + JD, get result
- `apps/cli` — folder of prompt `.md` + a short README

## Out of scope for v1

- Tailoring / rewriting CVs (only evaluation)
- Clarification loops with the user
- Feedback loops / iterative refinement
- PDF export
- Vector RAG of any kind
- Auth / accounts / persistence
- Tool calling beyond a small "ask user vs proceed" decision (deferred)
- Self-hosted Ollama adapter (one provider is enough to prove the contract)

## Done criteria

- A user can upload a PDF resume + paste a JD in web-ui and get a typed `EvalResult` back in under 30s.
- The same flow works through telegram with file upload.
- A power user can clone the repo, point Claude Code at `apps/cli/`, and run the same evaluation locally with their own model.
- `pnpm eval` runs the golden fixtures in CI and fails on regressions.
- Every `EvalResult` carries `rubricVersion` and `archetypeVersion`.
- No LLM response reaches the UI without passing Zod validation.
