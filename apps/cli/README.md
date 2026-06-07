# Power User — evaluate your resume locally

Run the full CV evaluation on your own machine with your own
[Claude Code](https://claude.com/claude-code). Your resume never leaves your
computer — no server, no account, no API keys in this repo.

## Quickstart

```bash
git clone https://github.com/TechImmigrants/cv-builder.git
cd cv-builder
claude              # open Claude Code at the repo root
```

No build or install is needed to evaluate — the skill reads the prompts and
rubric straight from the repo. (`pnpm install` is only for running the package
tests or the web app.)

Then, inside Claude Code:

```
/evaluate-cv ./my-resume.pdf
```

Optionally add a job description as keyword context:

```
/evaluate-cv ./my-resume.pdf --jd ./job.md
```

No resume handy? Run `/setup-profile` and it'll help you assemble one.

## What you get

An honest, role-adaptive score (0–5) with:

- a per-dimension breakdown across the six rubric dimensions,
- at least three specific issues, each quoting the exact line and giving a fix,
- any unsupported claims a recruiter would distrust,
- an ATS-compatibility read.

## How it works

The `/evaluate-cv` command drives the **cv-evaluation** skill
(`.claude/skills/cv-evaluation/`), which runs four steps against this repo:

| Step | Source |
|---|---|
| Extract structured resume | `packages/prompts/prompts/extract.md` |
| Detect role archetype | `packages/intelligence/src/archetypes/` |
| Score against the rubric | `packages/prompts/prompts/score.md` + `packages/intelligence/src/rubric.ts` |
| Flag unsupported claims | `packages/prompts/prompts/validate-claims.md` |

The result is validated against `EvalResultSchema`
(`packages/schemas`) before you see it.

## Privacy

Everything runs through your local Claude Code. This pack makes no network calls
of its own and stores nothing.
