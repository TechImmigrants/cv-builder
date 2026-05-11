# Architecture

## Overview

CV Builder is a monorepo with three packages that share a common core:

```
┌─────────────────────────────────────────────────────┐
│                    Users                              │
├──────────┬──────────────┬───────────────────────────┤
│   CLI    │    Web UI    │  Cursor/IDE Integration   │
│ (npx)   │  (browser)   │     (skill file)          │
├──────────┴──────────────┴───────────────────────────┤
│                  @cv-builder/core                     │
│  ┌──────────┐  ┌──────────┐  ┌────────────────┐    │
│  │Evaluator │  │ Builder  │  │  Archetypes    │    │
│  │(scoring) │  │(tailor)  │  │  (role configs)│    │
│  └──────────┘  └──────────┘  └────────────────┘    │
│  ┌──────────┐  ┌──────────────────────────────┐    │
│  │  Rules   │  │  LLM Provider (optional)     │    │
│  │(patterns)│  │  OpenAI / Anthropic / local   │    │
│  └──────────┘  └──────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

## Packages

### `@cv-builder/core`

The brain. Framework-agnostic TypeScript library that handles:

- **Evaluation** — Score a CV against 6 dimensions (shipped evidence, quantified impact, tooling visibility, ATS compatibility, keyword match, public proof)
- **Builder** — Tailor a CV to match a specific job description
- **Archetypes** — Role-specific scoring configurations (AI PM, Backend Engineer, etc.)
- **Rules** — Universal patterns that help or hurt a CV

**Key design decisions:**
- Works without an LLM (rule-based mode is fast and deterministic)
- LLM is optional and provider-agnostic (OpenAI, Anthropic, Ollama, etc.)
- All scoring logic is transparent and auditable (no black box)

### `@cv-builder/cli`

Command-line tool for power users:

```bash
npx @cv-builder/cli evaluate ./my-cv.md --jd ./job.md
npx @cv-builder/cli tailor ./my-cv.md --jd ./job.md --output tailored.md
npx @cv-builder/cli export ./my-cv.md --format pdf
```

### `@cv-builder/web`

Browser-based UI. Privacy-first: no data leaves the browser unless the user opts in to LLM-enhanced mode.

## Adding a New Archetype

1. Create a file in `packages/core/src/archetypes/` (e.g., `mobile-engineer.ts`)
2. Define keywords, evaluation weights, action verbs, and anti-patterns
3. Register it in `packages/core/src/archetypes/index.ts`
4. Add tests
5. Submit a PR using the "New Archetype" issue template

## Adding a New Rule

1. Add the pattern to `packages/core/src/rules/index.ts`
2. Include: name, regex match, severity, explanation, and fix suggestion
3. Add a source reference for why this rule matters
4. Add tests
5. Submit a PR using the "New Rule" issue template

## LLM Provider Architecture

The core engine is designed to work in two modes:

1. **Rule-based (default)** — Fast, deterministic, no API calls. Uses regex patterns and keyword matching. Good for basic scoring and keyword gap analysis.

2. **LLM-enhanced (opt-in)** — Deeper analysis using any supported provider. Generates full rewrites, contextual suggestions, and nuanced feedback.

```typescript
interface LLMProvider {
  name: string;
  evaluate(prompt: string): Promise<string>;
}
```

Providers are pluggable. We ship adapters for:
- OpenAI (GPT-4o, GPT-4.1)
- Anthropic (Claude)
- Ollama (local, privacy-first)
- Custom (bring your own endpoint)

## Privacy Principles

1. **No data collection.** The web UI runs client-side. No analytics, no telemetry.
2. **LLM is opt-in.** Rule-based mode works fully offline.
3. **No data leaves the browser** unless the user explicitly chooses LLM mode and provides their own API key.
4. **Self-hostable.** The entire stack can run on a user's machine.
