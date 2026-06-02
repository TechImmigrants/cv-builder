# Proposal — CV Builder v2

## Goal

A TypeScript-only, monorepo CV evaluator and builder. v1 ships **evaluation**: paste a resume + JD, get a typed, evidence-grounded score against a role archetype.

## Principles

- **One language.** TypeScript end-to-end (Node + React). No Python. Zod is the single source of truth for types.
- **Deterministic orchestration.** Our code decides the steps (parse → extract → score → validate). The LLM fills steps, not the workflow.
- **Structured outputs only.** Every LLM call returns a Zod-validated object. No free text leaking into the UI.
- **Evidence-grounded.** The model never invents numbers, tools, or claims the user did not provide. Unsupported claims are flagged, not fabricated.
- **Hallucination checks.** A second pass validates claims (tools exist, dates plausible, metrics traceable to the source resume).
- **Prompts as code.** Prompt templates live as `.md` files in a versioned package, not strings buried in handlers.
- **Eval-as-tests.** A fixed rubric + golden fixtures (JD + resume → expected findings) run in CI.
- **Provider-agnostic LLM.** One `llm` package, swap OpenAI / Anthropic / Ollama behind a single interface.
- **User-edited templates over parsing.** The UI offers structured templates so users enter data we can trust, instead of guessing from a PDF.

## Key decisions

| Decision           | Choice                                   | Why                                                                           |
| ------------------ | ---------------------------------------- | ----------------------------------------------------------------------------- |
| Language           | TypeScript only                          | UI needs it; nothing in scope needs Python                                    |
| Monorepo           | pnpm + turborepo (existing)              | Already in place, works                                                       |
| Schema             | Zod, centralized package                 | Shared types across apps and prompts                                          |
| LLM                | Provider-agnostic adapter                | Avoid lock-in; users may self-host                                            |
| UI                 | Next.js + TanStack Query + Tolgee (i18n) | SSR-friendly, typed data layer, multilingual from day one                     |
| Server             | Fastify on Node                          | Mature, typed (TypeBox/Zod plugin), great plugin ecosystem                    |
| CLI                | Prompts + templates only (no binary)     | Power users run their own Claude / Codex / Gemini against our prompt pack     |
| Workflow           | Deterministic pipeline                   | Tool calling restricted to small choices (e.g., "ask user" vs "proceed")      |
| PDF parser         | `unpdf`                                  | ESM-native, runs in Node and edge, actively maintained                        |
| JD URL crawler     | Playwright                               | Most JD pages are JS-rendered; static fetchers (cheerio/got) miss them        |
| Telegram transport | Long polling in dev, webhook in prod     | No public URL needed locally; same code path                                  |
| Default hosted LLM | Anthropic Claude                         | Strongest structured-output adherence in our testing; adapter still swappable |

## Architecture in one picture

```
            ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
 Apps:      │   web-ui     │   │   telegram   │   │  cli (prompts│
            │  (Next.js)   │   │     bot      │   │   + .md)     │
            └──────┬───────┘   └──────┬───────┘   └──────┬───────┘
                   │                  │                  │
                   ▼                  ▼                  ▼
            ┌──────────────────────────────┐    user's own agent
            │     apps/server (Fastify)    │    (Claude Code / Codex
            │   HTTP API + telegram hook   │     / Gemini CLI)
            └──────────────┬───────────────┘
                           │ uses
                           ▼
   ┌───────────────── packages/ ──────────────────┐
   │  core         intelligence    ingestion      │
   │  llm          prompts         schemas        │
   │  templates    eval                           │
   └──────────────────────────────────────────────┘
```

## Two user modes (privacy is explicit, not implied)

| Mode                           | Who                                                                | Data path                                                                               | Privacy                                                                                                                                              |
| ------------------------------ | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Power-user (CLI)**           | Devs running their own Claude / Codex / Gemini against `apps/cli/` | Resume + JD never leave the user's machine. They use their own model and their own key. | Fully private. We store nothing.                                                                                                                     |
| **Hosted (web-ui + telegram)** | Everyone else                                                      | Resume + JD go to our backend, which calls the LLM provider with our key.               | Not private by default. We do not persist resume text, but data does transit our infrastructure and the provider. This is stated up-front in the UI. |

The hosted mode is the trade-off for being usable by non-technical people. The CLI mode is the escape hatch for anyone who wants zero data egress.

### How each user actually interacts

**Power-user (CLI)**

1. Clones the repo (or installs the prompt pack).
2. Opens `apps/cli/` in Claude Code / Codex / Gemini CLI.
3. Drops their resume + JD (file or URL) into the working directory.
4. Their agent reads our prompts, loads the archetype + rubric from `packages/intelligence`, and produces the same typed `EvalResult` we produce server-side.
5. Nothing leaves their machine except the call to their own model with their own key.

**Hosted user (web-ui)**

1. Opens the site, picks a language (Tolgee), fills a structured template — or pastes/uploads a resume.
2. Pastes a JD or a job URL (server fetches it with Playwright).
3. Clicks evaluate → web-ui calls `POST /eval` on `apps/server`.
4. Server runs the deterministic pipeline (parse → classify → score → validate), calls Claude with our key, returns a typed `EvalResult`.
5. UI renders the result. Resume text is held in memory for the request only, not persisted.

**Hosted user (telegram)**

1. Sends resume (file or text) + JD (text or URL) to the bot.
2. Bot forwards to the same `POST /eval` endpoint on `apps/server`.
3. Server returns the result, bot formats it as a Telegram message.
