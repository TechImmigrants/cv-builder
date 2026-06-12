# Claim Validation

The prompt and the rules for what counts as an unsupported claim are in
`packages/prompts/prompts/validate-claims.md` (rules sourced from
`packages/intelligence/src/validators/claims.ts`).

Goal: catch what a recruiter would quietly distrust — a metric with no scope, a
tool listed but never used in a bullet, a seniority claim with no team size or
reach. For each flagged claim, say what's missing, not just that it's weak.
