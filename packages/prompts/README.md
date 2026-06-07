# @cv-builder/prompts

The three Phase 1 prompts a power user's agent runs, in `prompts/`:

- **extract** — raw resume text → structured `Resume`
- **score** — `Resume` (+ optional JD keywords) + rubric + archetype → `EvalResult`
- **validate-claims** — `Resume` → `Claim[]`, flagging unsupported claims

The `.md` files are the source of truth (readable, what the skill surfaces). The
renderers inject the live rubric and archetype data so the assembled prompt is
self-contained and stays in sync with `@cv-builder/intelligence`.

```ts
import { renderScorePrompt } from "@cv-builder/prompts";
import { softwareEngineer } from "@cv-builder/intelligence";

const prompt = renderScorePrompt({ archetype: softwareEngineer, jdKeywords });
```

Each prompt asks for JSON matching its schema in `@cv-builder/schemas`; callers
validate that output before using it.
