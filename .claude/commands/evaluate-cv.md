---
description: Score a resume against the CV Builder rubric, fully locally
argument-hint: <path-to-resume> [--jd <path-to-job-description>]
---

Evaluate the resume using the `cv-evaluation` skill.

Arguments: $ARGUMENTS

- The first argument is the path to the resume (PDF, markdown, or text).
- An optional `--jd <path>` adds a job description as keyword context only.

Read the file(s), run the extract → detect → score → validate-claims pipeline,
validate the result against `EvalResultSchema`, then present the overall score,
the per-dimension breakdown, the top issues with fixes, and any unsupported
claims. Nothing leaves this machine.
