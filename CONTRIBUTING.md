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

If you're developing on Windows, read [docs/WINDOWS_SETUP.md](docs/WINDOWS_SETUP.md)
before running the commands above. It covers shell differences, pnpm setup,
line endings, and a few Windows-specific gotchas that commonly block first-time contributors.

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

# Check formatting
pnpm format:check

# Fix formatting
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
