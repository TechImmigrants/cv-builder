# Initial Issues for Contributors

These are the starter issues to create on GitHub. Run the script below or create them manually.

---

## Archetypes (good first issue)

1. **[Archetype] Mobile Engineer (iOS/Android)** — Add keywords (Swift, Kotlin, React Native, Flutter), weights, verbs, anti-patterns. Labels: `archetype`, `good first issue`
2. **[Archetype] Security Engineer** — Cybersecurity, AppSec, cloud security keywords and scoring. Labels: `archetype`, `good first issue`
3. **[Archetype] Machine Learning Engineer** — Classic ML (not LLM-focused), scikit-learn, XGBoost, feature engineering. Labels: `archetype`, `good first issue`
4. **[Archetype] Full-Stack Engineer** — Combined frontend + backend keywords and balanced weights. Labels: `archetype`, `good first issue`
5. **[Archetype] QA / Test Engineer** — Testing frameworks, automation, CI/CD integration. Labels: `archetype`, `good first issue`
6. **[Archetype] Technical Program Manager** — Cross-team coordination, program delivery, stakeholder management. Labels: `archetype`, `good first issue`
7. **[Archetype] UX/UI Designer** — Design tools, user research, accessibility, portfolio-heavy. Labels: `archetype`, `good first issue`
8. **[Archetype] Cloud Architect** — Multi-cloud, solution architecture, Well-Architected Framework. Labels: `archetype`, `good first issue`
9. **[Archetype] Blockchain / Web3 Engineer** — Solidity, smart contracts, DeFi keywords. Labels: `archetype`, `good first issue`
10. **[Archetype] Game Developer** — Unity, Unreal, C++, game design, shipped titles. Labels: `archetype`, `good first issue`

## Rules (good first issue)

11. **[Rule] Detect "Objective" section at top of CV** — Outdated format, should be a summary with proof points. Labels: `rules`, `good first issue`
12. **[Rule] Detect education-first layout for experienced candidates** — Education should be at the bottom for 3+ years experience. Labels: `rules`, `good first issue`
13. **[Rule] Flag CVs longer than 2 pages** — Research shows 1-2 pages optimal for most roles. Labels: `rules`, `good first issue`
14. **[Rule] Detect inconsistent date formats** — "Jan 2022" mixed with "2022-01" hurts ATS parsing. Labels: `rules`, `good first issue`
15. **[Rule] Flag "References available upon request"** — Wastes space, universally considered outdated. Labels: `rules`, `good first issue`

## Core Engine (medium difficulty)

16. **[Core] Add unit tests for evaluator scoring** — Test each dimension scorer with sample CVs. Labels: `core`, `help wanted`
17. **[Core] Add unit tests for archetype detection** — Test auto-detection picks the right archetype. Labels: `core`, `help wanted`
18. **[Core] Implement keyword extraction with TF-IDF** — Better keyword extraction from JDs than simple word splitting. Labels: `core`, `enhancement`
19. **[Core] Add support for YAML-based archetype files** — Load archetypes from .yml files instead of hardcoding in TS. Labels: `core`, `enhancement`
20. **[Core] Implement the `tailor` function** — Actually rewrite CV sections to better match the JD. Labels: `core`, `enhancement`

## CLI (medium difficulty)

21. **[CLI] Add `tailor` command** — Run `cv-builder tailor cv.md --jd job.md` to get a tailored version. Labels: `cli`, `enhancement`
22. **[CLI] Add `export` command (PDF output)** — Convert markdown CV to formatted PDF. Labels: `cli`, `enhancement`
23. **[CLI] Add `--format json` flag to evaluate** — Output machine-readable JSON for piping. Labels: `cli`, `good first issue`
24. **[CLI] Add color output with chalk** — Make terminal output pretty with colors and formatting. Labels: `cli`, `good first issue`
25. **[CLI] Add `--archetype` flag to force a specific role type** — Override auto-detection. Labels: `cli`, `good first issue`

## Web UI (larger scope)

26. **[Web] Set up Next.js project with Tailwind** — Initialize the web package with basic routing. Labels: `web-ui`, `help wanted`
27. **[Web] Build the "Paste CV + JD" input screen** — Two text areas, a submit button, file upload support. Labels: `web-ui`, `help wanted`
28. **[Web] Build the results display component** — Show score, dimensions (visual bars), issues, rewrites. Labels: `web-ui`, `help wanted`
29. **[Web] Build the keyword gap visualization** — Show matched vs missing keywords visually. Labels: `web-ui`, `enhancement`
30. **[Web] Add dark mode support** — Respect system preference, add toggle. Labels: `web-ui`, `good first issue`

## Research & Documentation

31. **[Research] Add 2026 salary data for European tech roles** — Extend market-stats beyond US data. Labels: `research`, `good first issue`
32. **[Research] Research ATS behavior for non-English CVs** — Do the same rules apply for German, French, Finnish CVs? Labels: `research`, `help wanted`
33. **[Docs] Add Windows setup instructions** — Test and document setup on Windows with pnpm. Labels: `docs`, `good first issue`
34. **[Docs] Add example CVs (anonymized)** — Before/after examples showing the tool's impact. Labels: `docs`, `help wanted`
35. **[Docs] Create a "How scoring works" explainer** — User-facing documentation of the algorithm. Labels: `docs`, `good first issue`

## Infrastructure

36. **[CI] Add automated release with changesets** — Auto-publish to npm on merge to main. Labels: `chore`, `help wanted`
37. **[CI] Add PR size labeling bot** — Auto-label PRs as xs/s/m/l/xl. Labels: `chore`, `good first issue`
38. **[CI] Add CodeQL security scanning** — Automated vulnerability detection. Labels: `chore`, `good first issue`
