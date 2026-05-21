# Architecture

## Layout

```
cv-builder/
├── apps/
│   ├── web-ui/        Next.js + TanStack Query + Tolgee
│   ├── server/        Fastify — HTTP API + telegram webhook
│   ├── telegram/      Bot worker (long polling in dev, webhook in prod)
│   └── cli/           .md prompts + templates (no code, no binary)
└── packages/
    ├── schemas/       Zod schemas — the source of truth for all types
    ├── prompts/       Prompt templates (.md) + loaders
    ├── llm/           Provider-agnostic LLM client + adapters
    ├── ingestion/     PDF parsing, markdown parsing, URL/JD scraping
    ├── intelligence/  Archetypes, rubric, eval pipeline, claim validator
    ├── templates/     Resume render templates (React)
    ├── eval/          Eval harness — fixtures + assertions for CI
    └── core/          Orchestrator that wires the deterministic workflow
```

## Packages

### `schemas`
Zod schemas for: `Resume`, `JobDescription`, `Archetype`, `RubricVersion`, `EvalResult`, `Claim`, `Issue`, `LLMCall`. Every other package imports types from here.

### `prompts`
Prompt files (`.md`) grouped by step (`extract.md`, `score.md`, `validate-claims.md`, `clarify.md`). A loader returns a rendered prompt + the Zod schema the response must satisfy. The `cli` app is a thin export of this package's files.

### `llm`
One interface:
```ts
interface LLMClient {
  call<T>(req: { prompt: string; schema: ZodSchema<T>; model?: string }): Promise<T>;
}
```
Adapters: OpenAI, Anthropic, Ollama. Handles JSON-schema mode, retries, and parse-or-throw against the Zod schema.

### `ingestion`
Parsers and fetchers. Input: file, text, or URL. Output: typed `Resume` or `JobDescription` (best-effort, partial).
- **PDF resumes** — `unpdf`.
- **JD from URL** — Playwright. Most job boards (Greenhouse, Lever, Workday, LinkedIn) render content via JS, so a static fetch returns an empty shell. Playwright loads the page, waits for content, extracts the JD text. Headless Chromium is heavy but unavoidable for this surface.
- **Markdown / plain text** — direct parse.

### `intelligence`
The "brain". Contains:
- `archetypes/` — role configs (weights, keywords, anti-patterns)
- `rubric/` — versioned scoring rubric
- `pipeline/` — `evaluate(resume, jd, archetype)` runs the deterministic steps
- `validators/` — claim validator, tool/tech hallucination detector, ATS formatter checker

### `templates`
Two layers so both web-ui and CLI can use it:
- **Manifest layer** — each template described as data (sections, fields, ordering, constraints) typed against `schemas`. Prompts in `apps/cli/` reference manifests so a power user's agent knows what to fill.
- **Render layer** — React components that render a `Resume` against a manifest. Consumed by `web-ui` now; feeds PDF export later.

### `eval`
Golden fixtures (`fixtures/*.json` = JD + resume + expected findings). Vitest runner asserts: required findings present, banned hallucinations absent, score within tolerance. Runs in CI.

### `core`
Orchestrator. Exposes one function per use case (e.g., `runEvaluation`) that composes ingestion → intelligence → validators → result. Apps depend on `core`, not on `intelligence` directly.

## Apps

### `web-ui`
Next.js. Routes: template editor, JD paste, eval result view. Multilingual via Tolgee. Calls `server` over HTTP. "Bring your own key" toggle stays first-class.

### `server`
Fastify. Endpoints: `POST /eval`, `POST /parse`, `POST /telegram/webhook`. Holds the server-side LLM key (or proxies the user's). Never persists resume text.

### `telegram`
Telegram bot. v1 surface: send resume + JD as files or text, receive eval result back. Long polling in dev.

### `cli`
A folder of `.md` files. README tells users to point Claude Code / Codex / Gemini CLI at it. No npm package.

## Data flow — evaluation (v1)

```
1. ingestion.parse(resume_file)     → Resume (partial ok)
2. ingestion.parse(jd_text)         → JobDescription
3. intelligence.classify(resume)    → Archetype
4. intelligence.evaluate(...)       → EvalResult (LLM, structured)
5. validators.checkClaims(...)      → flags unsupported claims
6. validators.checkATS(...)         → ATS issues
7. return EvalResult{ rubricVersion, archetype, score, issues, claims }
```

Steps 1–3 and 5–6 are deterministic code. Step 4 is the LLM call, structured-output enforced.

## How archetypes and the rubric are actually used

An **archetype** is role-specific configuration: keywords that matter, dimension weights, action verbs that signal seniority, anti-patterns. A **rubric** is the dimension definitions and the 0–5 scoring guide for each — the same across all roles, only weights change per archetype.

### Step 3 — `classify`

Deterministic. Match the resume's titles, tools, and verbs against each archetype's keyword set. Pick the highest-scoring archetype. No LLM.

```ts
classify(resume) → "ai-engineer"  // or "backend", "pm", "data-scientist", ...
```

### Step 4 — `evaluate`  (the only LLM step)

We hydrate a prompt template from `packages/prompts/score.md` with the archetype + rubric + the user's data, ask for a Zod-validated `EvalResult` back, and that's it. Schematically, the call looks like:

```
SYSTEM:
You are evaluating a resume against a job description for the role:
{{archetype.title}}.

Score on these dimensions. For each, the rubric defines what 0–5 means:
{{rubric.dimensions}}   // shippedEvidence, quantifiedImpact, toolingVisibility,
                        // atsCompatibility, keywordMatch, publicProof
Weights for this archetype:
{{archetype.weights}}

Hard rules:
- Only use facts present in the RESUME or JD below. Do not invent metrics,
  tools, employers, or dates. If unsupported, mark as a Claim with
  evidence: null and flag it.
- Output must satisfy the EvalResult schema. No prose outside the schema.

Archetype signal: keywords {{archetype.keywords}},
                  anti-patterns {{archetype.antiPatterns}}.

USER:
RESUME:
{{resume}}

JOB DESCRIPTION:
{{jd}}

Return: EvalResult
```

The response is parsed against the `EvalResult` Zod schema. If it fails, one retry with the parse error appended; second failure throws.

### Step 5 — `checkClaims`

A second, smaller LLM call (or rule check where possible) takes each `Claim` from the eval result and asks: "is this supported by the resume text? quote the supporting span or say null." Anything unsupported is downgraded to a flagged issue, not surfaced as a strength.

### Why split it this way

- Archetypes are data, swappable without touching prompts.
- Rubric is data, versioned (`rubricVersion`) so an old eval can be reproduced.
- The prompt is markdown, reviewed in PRs, not a string buried in TS.
- The orchestrator decides the order. The model only fills the slots it is good at filling.

## LLM call contract

Every call goes through `llm.call({ prompt, schema })`. If the response does not parse against `schema`, retry once with the parse error injected. After the second failure, the orchestrator throws — the app surfaces a typed error, not a half-broken result.

## Versioning

Every `EvalResult` carries `rubricVersion` and `archetypeVersion`. Old results stay reproducible. Bumping a rubric is a deliberate, reviewed change.
