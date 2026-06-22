# Contributing to CV Builder

Thank you for contributing! This project is built by the Tech Immigrants community, and every contribution matters.

## Prerequisites

- Node.js 20+
- pnpm 9+ (`npm install -g pnpm`)
- Git

## Setup

```bash
# Fork the repo on GitHub, then:
git clone https://github.com/YOUR-USERNAME/cv-builder.git
cd cv-builder
git remote add upstream https://github.com/TechImmigrants/cv-builder.git
pnpm install
pnpm build
```

## Project Structure

```
packages/
├── core/     # Evaluation engine — TypeScript library
├── cli/      # Command-line tool
└── web/      # Browser UI (Next.js)
research/     # Sources and data backing our rules
docs/         # Architecture and guides
```

## Development Workflow

### 1. Pick an issue

- Check [Issues](https://github.com/TechImmigrants/cv-builder/issues)
- Comment "I'll take this" so others know it's claimed
- Issues labeled `good first issue` are great for newcomers

### 2. Create a branch

```bash
git checkout -b feature/your-feature-name
```

Branch naming:
- `feature/pdf-export` — new features
- `fix/scoring-bug` — bug fixes
- `archetype/mobile-engineer` — new role archetypes
- `rule/objective-statement` — new evaluation rules
- `docs/setup-guide` — documentation

### 3. Make your changes

```bash
# Run the specific package you're working on
pnpm --filter @cv-builder/core dev    # Watch mode for core
pnpm --filter @cv-builder/cli dev     # Watch mode for CLI

# Run tests
pnpm test

# Lint (Biome)
pnpm lint

# Auto-fix lint + formatting issues
pnpm lint:fix

# Check formatting only
pnpm format:check

# Fix formatting only
pnpm format
```

### 4. Commit with clear messages

```bash
git commit -m "feat(core): add mobile engineer archetype"
git commit -m "fix(cli): handle empty CV file gracefully"
git commit -m "docs: add setup instructions for Windows"
```

Format: `type(scope): description`

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`
Scopes: `core`, `cli`, `web`, `research`, `ci`

### 5. Submit a pull request

```bash
git push origin feature/your-feature-name
```

Then open a PR on GitHub. Fill in the template — it asks:
- What does this PR do?
- Related issue number
- Type of change
- Checklist

### 6. Code review

A maintainer will review within 24 hours. We might ask for changes — that's normal. We review with respect and expect the same.

---

## Adding a New Archetype (Most Common Contribution)

This is the easiest way to make a meaningful impact:

1. Open an issue using the "New Role Archetype" template
2. Research 15-30 keywords for the role (check real job postings)
3. Add the archetype to `packages/core/src/archetypes/index.ts`
4. Add tests
5. Submit a PR

Example archetype structure:

```typescript
ARCHETYPES.set("mobile-engineer", {
  id: "mobile-engineer",
  name: "Mobile Engineer",
  description: "iOS/Android engineers building native and cross-platform apps",
  keywords: ["swift", "kotlin", "react native", "flutter", ...],
  evaluationWeights: {
    shippedEvidence: 0.25,
    quantifiedImpact: 0.20,
    toolingVisibility: 0.20,
    atsCompatibility: 0.15,
    keywordMatch: 0.10,
    publicProof: 0.10,
  },
  actionVerbs: ["Built", "Shipped", "Optimized", ...],
  antiPatterns: ["familiar with mobile development", ...],
});
```

## Adding a New Rule

1. Open an issue using the "New Rule" template
2. Include evidence (recruiter source, hiring data)
3. Add the rule to `packages/core/src/rules/index.ts`
4. Add tests
5. Submit a PR

---

## Contributing Without Code

You don't need to write TypeScript to make a meaningful contribution. Most of
the work that makes this project useful — research, rules, anti-patterns,
sample CVs, translations, docs — comes from people with domain expertise, not
engineering skills. If you've ever reviewed a friend's CV, you've already done
80% of the work for several of these paths.

### Six ways to contribute without coding

#### 1. Add a research source

Every scoring rule and keyword list should trace back to evidence — recruiter
interviews, hiring-manager surveys, market data. We currently cite 250+
sources in [`research/sources.md`](research/sources.md). The bar to add one is
low and the impact is real.

**How to do it:**
1. Find a credible source (recruiter post, hiring study, industry report).
   Personal blogs and unsubstantiated opinions don't count — published or
   institutional sources where possible.
2. Open an issue with the `research` label. Include:
   - The source (URL + author + date)
   - The specific claim it supports
   - Which rule, archetype, or anti-pattern it backs
3. A maintainer will review and merge it into `research/sources.md` (or open a
   PR if you'd like to do it yourself).

**Example:**
> Source: "The 7 Things Recruiters Look For First" — John Smith, 2025.
> Supports: `keywordMatch` rubric dimension.
> Specific claim: "80% of recruiters spend less than 6 seconds on initial scan;
> keyword presence is the dominant factor in pass/fail."

**Time cost:** 10–20 minutes per source.

#### 2. Propose an anti-pattern

Every archetype ships with an `antiPatterns` list — phrases like *"passionate
about products"*, *"leveraged synergies"*, *"team player"*, *"familiar with X"*
that read as filler to recruiters. These come from real CVs and real recruiter
feedback, not from a textbook. If you've spotted one in the wild, add it.

**How to do it:**
1. Find a phrase in your own CV (or a friend's) that you now realize was filler.
2. Check [`packages/core/src/archetypes/`](packages/core/src/archetypes/) — if
   it's not already listed for the relevant archetype, open an issue with the
   `rules` label.
3. Include:
   - The phrase
   - Which archetype it's relevant to (or "all")
   - Why it reads as filler (1–2 sentences)

**Time cost:** 5–10 minutes per anti-pattern.

#### 3. Provide a sample CV (or job description)

We don't have public test fixtures. That means contributors writing scoring
rules have nothing to test against, and users have nothing to compare their
own CV to. A small library of sample CVs — deliberately imperfect, with weak
metrics, vague impact, missing quantification — would unlock both contributor
testing and user demos.

**How to do it:**
1. Author a fictional CV: 1 page, 3–5 years of experience, deliberately
   include 2–3 weak spots. Or anonymize your own.
2. Pair it with a fictional job description.
3. Open an issue with the `examples` label and attach both files (or paste
   inline).
4. Maintainers will add to `examples/` (we'll create the directory).

**Time cost:** 30–45 minutes per pair.

#### 4. Translate the README or docs

The README is the project's front door. Most of the audience this project
serves — immigrants, career changers, people in countries with restricted
internet — reads English as a second or third language. A clean translation
unlocks thousands of readers.

**How to do it:**
1. Fork the repo.
2. Copy `README.md` → `README.<lang-code>.md` (e.g., `README.es.md`,
   `README.pt-BR.md`, `README.hi.md`, `README.ar.md`, `README.zh.md`).
3. Translate faithfully. Preserve code blocks (don't translate shell commands).
   Preserve links to English docs unless you can link to a translated version.
4. Open a PR using the branch naming `docs/translate-<lang>`.

**Highest-impact first translations** (per audience demographics and GitHub
traffic): Spanish, Brazilian Portuguese, Hindi, Arabic, Mandarin.

**Time cost:** 1–2 hours per language.

#### 5. Improve the docs

Docs gaps are everywhere. The `docs/` directory has architecture notes, a
phase-1 plan, and an issues seed — but no contributor onboarding doc, no
"frequently asked questions," no "I just got a bad score, what do I do"
guide, no CLI troubleshooting, no glossary of evaluation terms. Each of
these is a 1-page writeup.

**How to do it:**
1. Pick a gap from the list above (or one you've personally hit).
2. Write the doc in `docs/`.
3. Open a PR using the branch naming `docs/<your-doc>`.

**Time cost:** 30–90 minutes per doc.

#### 6. Triage issues and help others

The fastest way to become a recognized contributor is to be the person who
answers questions. Right now most issues get one response from a maintainer
— if you can answer even one open issue, you free maintainer time and signal
"I'm here, I know this codebase."

**How to do it:**
1. Look at issues with the `help wanted` or `good first issue` label.
2. If you can answer a question (even partially), comment. If you can reproduce
   a bug, comment with the steps.
3. If you're confident a label is missing or an issue is a duplicate, suggest
   it via a comment (maintainers will adjust labels).

**Time cost:** 5–15 minutes per issue.

---

### How to submit a non-code contribution

The workflow is the same as code, minus the obvious steps:

1. **Open an issue first** using the most relevant label (`research`, `rules`,
   `examples`, `docs`). Comment "I'll take this" to claim it.
2. **For docs / translations / examples:** fork → branch → PR. Branch-naming
   conventions from the [Development Workflow](#development-workflow) section
   still apply (`docs/<your-doc>`, `archetype/<your-archetype>`, etc.).
3. **For research / anti-patterns / triage:** an issue is enough — no PR
   needed unless you want to write the change yourself.

A maintainer will respond within 48 hours. If you don't hear back, ping the
[Telegram group](https://t.me/techimmigrants).

---

## Guidelines

- **One issue = one PR.** Don't bundle unrelated changes.
- **Tests required** for new features and bug fixes in `core/`.
- **Research required** for new rules (link your source).
- **Ask if unsure.** No question is too basic. Open an issue or ask in Telegram.
- **Keep it simple.** We prefer readable code over clever code.

## What We DON'T Accept

- Changes without a linked issue (open one first)
- Rules without source citations
- Breaking changes to the core API without an RFC
- Code that collects user data or phones home

---

## First Time Contributing to Open Source?

Welcome! You belong here. These resources help:
- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [First Timers Only](https://www.firsttimersonly.com/)
- [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow)

## Questions?

- Open a [Discussion](https://github.com/TechImmigrants/cv-builder/discussions) on GitHub
- Ask in the [Telegram group](https://t.me/techimmigrants)
- Tag a maintainer on your issue
