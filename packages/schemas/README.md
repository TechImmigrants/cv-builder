# @cv-builder/schemas

[Zod](https://zod.dev) schemas shared across CV Builder surfaces. Schemas are
the source of truth; TypeScript types are inferred from them.

Phase 1 requires that no LLM response is used without passing Zod validation,
and that every `EvalResult` carries a `rubricVersion` and `archetypeVersion`.

```ts
import { EvalResultSchema, type EvalResult } from "@cv-builder/schemas";

const result: EvalResult = EvalResultSchema.parse(rawModelOutput);
```

Exports: `Resume` / `ResumeSource`, `JobDescription`, `Archetype`,
`EvaluationWeights`, `EvaluationDimension`, `Issue`, `Claim`, `EvalResult`
(each with its `*Schema`). Evaluation types only — tailoring is Phase 2.
