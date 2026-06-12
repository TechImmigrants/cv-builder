---
name: cv-evaluation
description: Evaluate a resume against the CV Builder rubric and return a scored, schema-valid EvalResult. Use when the user wants their CV or resume scored, critiqued, or checked for ATS issues and unsupported claims.
---

# CV Evaluation

Run a resume through the same four-step evaluation the hosted product uses,
entirely locally. Everything you need lives in this repo — read the source, don't
guess.

## Inputs

- A resume file (PDF, markdown, or plain text). For PDF, read the text content.
- Optionally a job description, used only as keyword context (Phase 1 does not
  fit-score against a JD).

## Pipeline

1. **Extract.** Apply `packages/prompts/prompts/extract.md` to the raw resume
   text to produce a structured `Resume`.
2. **Detect archetype.** Match the resume against the role archetypes in
   `packages/intelligence/src/archetypes/`. Pick the best fit; default to
   Software Engineer when there's no clear signal. See [archetypes](./archetypes.md).
3. **Score.** Apply `packages/prompts/prompts/score.md` with the detected
   archetype's weights and the rubric. See [rubric](./rubric.md) and
   [scoring](./scoring.md). Surface **at least 3** issues, each quoting the exact
   resume text and giving a concrete fix.
4. **Validate claims.** Apply `packages/prompts/prompts/validate-claims.md` to
   flag unsupported claims. See [claim-validation](./claim-validation.md).

## Output

Produce one `EvalResult` (schema: `packages/schemas/src/evaluation.ts`). It must
carry `rubricVersion` and `archetypeVersion`. Validate the object against
`EvalResultSchema` before presenting it — never show an unvalidated result.

Then summarize for the user: overall score, the per-dimension breakdown, the top
issues with their fixes, and any unsupported claims.
