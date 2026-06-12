# CV Builder

**Paste a job description + your CV. Get a scored evaluation, specific rewrites, and a tailored PDF.**

An open source, privacy-first CV builder for tech professionals. Built by the [Tech Immigrants](https://youtube.com/c/TechImmigrants) community.

[![CI](https://github.com/TechImmigrants/cv-builder/actions/workflows/ci.yml/badge.svg)](https://github.com/TechImmigrants/cv-builder/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Why This Exists

Good CV tools are expensive. Many job seekers — especially immigrants, career changers, and people in countries with restricted internet — can't access them. We're building a free, open source alternative backed by real hiring research.

**What makes this different:**
- Scoring based on [250+ researched sources](research/sources.md) from FAANG recruiters, AI hiring managers, and industry experts
- Role-specific evaluation (not one-size-fits-all)
- Privacy-first: works offline, no data collection
- Transparent: every rule is auditable, every score is explainable

---

## How It Works

```
┌──────────┐     ┌──────────────┐     ┌──────────────┐
│  Your CV │ ──▶ │  CV Builder  │ ──▶ │ Score: 4.2/5 │
└──────────┘     │   Engine     │     │ 3 rewrites   │
┌──────────┐     │              │     │ 5 issues     │
│    JD    │ ──▶ │  (6 scoring  │     │ Keywords gap │
│(optional)│     │  dimensions) │     │ Tailored CV  │
└──────────┘     └──────────────┘     └──────────────┘
```

### Scoring Dimensions

| Dimension | What it measures |
|-----------|-----------------|
| Shipped Evidence | Real work in production, not theory |
| Quantified Impact | Numbers in every bullet (%, $, users) |
| Tooling Visibility | Specific tools named, matching the JD |
| ATS Compatibility | Will it parse correctly in applicant tracking systems? |
| Keyword Match | Terminology from the JD present in your CV |
| Public Proof | GitHub, blog, portfolio links that verify claims |

Weights vary by role type. An AI Engineer's CV is scored differently than a Product Manager's.

---

## Quick Start

### CLI (available now)

```bash
# Clone and build
git clone https://github.com/TechImmigrants/cv-builder.git
cd cv-builder
pnpm install
pnpm build

# Evaluate your CV
pnpm --filter @cv-builder/cli start evaluate ./my-cv.md

# Evaluate against a specific job description
pnpm --filter @cv-builder/cli start evaluate ./my-cv.md --jd ./job.md

# List available role archetypes
pnpm --filter @cv-builder/cli start archetypes
```

### Power User — run it with Claude Code

Clone the repo, open [Claude Code](https://claude.com/claude-code) at the root, and run `/evaluate-cv ./your-resume.pdf`. The evaluation runs entirely on your machine with your own agent — no server, no account, nothing leaves your computer. No build needed.

See [apps/cli/README.md](apps/cli/README.md) for the full guide.

### Web UI (coming soon)

A browser-based interface where you paste your CV and JD, get instant feedback, and export a tailored PDF. No sign-up required, no data leaves your browser.

---

## Architecture

```
packages/
├── schemas/       # Zod contract shared by every surface
├── intelligence/  # Rubric, archetypes, validators (the brain)
├── prompts/       # extract / score / validate-claims prompt pack
├── core/          # Deterministic evaluation engine
├── cli/           # Command-line interface
└── eval/          # Golden fixtures (pnpm eval)
apps/
├── cli/           # Power-user quickstart
└── web-ui/        # Browser UI (coming soon)
.claude/           # Claude Code skill + slash commands (power-user surface)
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the full technical design.

---

## Contributing

We have **26 contributors** ready to build this together. Whether you're a first-time open source contributor or a senior engineer, there's work for you.

### Quick Start for Contributors

```bash
git clone https://github.com/TechImmigrants/cv-builder.git
cd cv-builder
pnpm install
pnpm build
pnpm test
```

### Where to Start

| Your skill | Start here |
|------------|-----------|
| TypeScript / Backend | `packages/intelligence/` — rubric, new archetypes, validators |
| React / Frontend | `apps/web-ui/` — build the UI from scratch |
| CLI / Node.js | `packages/cli/` — new commands, output formatting |
| Research / Writing | `research/` — find sources, validate rules |
| Design / UX | UI mockups, user flows, accessibility |
| DevOps / CI | `.github/workflows/` — testing, releases, automation |

### Issue Labels

- `good first issue` — Small, self-contained tasks perfect for newcomers
- `archetype` — Add a new role type (great for domain experts)
- `rules` — New CV evaluation rules
- `help wanted` — Needs community input
- `web-ui` — Frontend/design work
- `core` — Engine logic

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide.

---

## Supported Role Archetypes

Currently built-in:

- AI Product Manager
- AI Engineer
- Backend Engineer
- Frontend Engineer
- DevOps / SRE
- Data Engineer

**Want to add your role?** Use the [New Archetype issue template](.github/ISSUE_TEMPLATE/new_archetype.md) and submit a PR. Each archetype needs 15+ keywords, evaluation weights, action verbs, and anti-patterns.

---

## Roadmap

### v0.1 (Current Sprint)
- [x] Core evaluation engine with 6 dimensions
- [x] 6 role archetypes
- [x] Universal anti-pattern detection
- [x] CLI: basic evaluate command
- [ ] Unit tests for scoring logic
- [ ] Web UI: paste and score screen

### v0.2
- [ ] LLM-enhanced mode (rewrite suggestions)
- [ ] PDF export
- [ ] 15+ role archetypes
- [ ] Keyword gap analysis with suggestions
- [ ] Localization (multiple languages)

### v0.3
- [ ] Side-by-side tailoring editor
- [ ] Before/after examples library
- [ ] VS Code / Cursor extension
- [ ] Self-hosted deployment guide

---

## Community

- Telegram Channel: [Tech Immigrants](https://t.me/TwitterImmigrant)
- Telegram Group: [Tech Immigrants](https://t.me/techimmigrants)
- YouTube: [Tech Immigrants](https://youtube.com/c/TechImmigrants)
- LinkedIn: [Tech Immigrants](https://www.linkedin.com/company/techimmigrants/)
- X: [@tech_immigrants](https://x.com/tech_immigrants)

---

## Research

Our rules are backed by data, not vibes. See:
- [research/sources.md](research/sources.md) — All 250+ sources with citations
- [research/data/](research/data/) — Structured market data
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — Technical design decisions

---

## License

[MIT](LICENSE) — Use it, fork it, build on it. Free forever.
