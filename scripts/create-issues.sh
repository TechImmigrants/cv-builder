#!/bin/bash
# Bulk-create GitHub issues for CV Builder
# Run: bash scripts/create-issues.sh
# Requires: gh CLI authenticated (gh auth login)

REPO="TechImmigrants/cv-builder"

echo "Creating labels..."
gh label create "archetype" --color "7057ff" --description "New role archetype" --repo $REPO 2>/dev/null
gh label create "rules" --color "0e8a16" --description "CV evaluation rules" --repo $REPO 2>/dev/null
gh label create "core" --color "d73a4a" --description "Core engine logic" --repo $REPO 2>/dev/null
gh label create "cli" --color "006b75" --description "CLI package" --repo $REPO 2>/dev/null
gh label create "web-ui" --color "1d76db" --description "Web UI package" --repo $REPO 2>/dev/null
gh label create "research" --color "fbca04" --description "Research and data" --repo $REPO 2>/dev/null
gh label create "good first issue" --color "7057ff" --description "Good for newcomers" --repo $REPO 2>/dev/null
gh label create "help wanted" --color "008672" --description "Extra attention is needed" --repo $REPO 2>/dev/null

echo ""
echo "Creating archetype issues..."

gh issue create --repo $REPO --title "[Archetype] Mobile Engineer (iOS/Android)" \
  --label "archetype,good first issue" \
  --body "Add a Mobile Engineer archetype to \`packages/core/src/archetypes/index.ts\`.

**Needed:**
- 15-30 keywords (Swift, Kotlin, React Native, Flutter, Xcode, etc.)
- Evaluation weights (suggest which dimensions matter most)
- 10+ action verbs specific to mobile dev
- 5+ anti-patterns common in mobile engineer CVs
- Source references (real job postings you researched)

See existing archetypes in the file for the pattern to follow."

gh issue create --repo $REPO --title "[Archetype] Security Engineer" \
  --label "archetype,good first issue" \
  --body "Add a Security Engineer archetype.

**Needed:**
- 15-30 keywords (pentesting, SAST/DAST, OWASP, SOC2, IAM, etc.)
- Evaluation weights
- 10+ action verbs
- 5+ anti-patterns
- Source references"

gh issue create --repo $REPO --title "[Archetype] Machine Learning Engineer (Classical ML)" \
  --label "archetype,good first issue" \
  --body "Add a classic ML Engineer archetype (scikit-learn, XGBoost, feature engineering, not LLM-focused).

**Needed:**
- 15-30 keywords
- Evaluation weights
- 10+ action verbs
- 5+ anti-patterns
- Source references"

gh issue create --repo $REPO --title "[Archetype] Full-Stack Engineer" \
  --label "archetype,good first issue" \
  --body "Add a Full-Stack Engineer archetype with balanced frontend + backend keywords.

**Needed:**
- 15-30 keywords spanning both frontend and backend
- Balanced evaluation weights
- 10+ action verbs
- 5+ anti-patterns
- Source references"

gh issue create --repo $REPO --title "[Archetype] QA / Test Engineer" \
  --label "archetype,good first issue" \
  --body "Add a QA/Test Engineer archetype.

**Needed:**
- 15-30 keywords (Playwright, Cypress, Jest, test automation, CI/CD, etc.)
- Evaluation weights
- 10+ action verbs
- 5+ anti-patterns
- Source references"

gh issue create --repo $REPO --title "[Archetype] Technical Program Manager" \
  --label "archetype,good first issue" \
  --body "Add a Technical Program Manager archetype.

**Needed:**
- 15-30 keywords (program delivery, cross-team, dependency management, etc.)
- Evaluation weights (execution + influence should be high)
- 10+ action verbs
- 5+ anti-patterns
- Source references"

gh issue create --repo $REPO --title "[Archetype] UX/UI Designer" \
  --label "archetype,good first issue" \
  --body "Add a UX/UI Designer archetype. Note: designers are portfolio-heavy, so Public Proof weight should be higher.

**Needed:**
- 15-30 keywords (Figma, user research, wireframing, design systems, etc.)
- Evaluation weights (public proof should be weighted higher)
- 10+ action verbs
- 5+ anti-patterns
- Source references"

gh issue create --repo $REPO --title "[Archetype] Cloud Architect" \
  --label "archetype,good first issue" \
  --body "Add a Cloud Architect archetype.

**Needed:**
- 15-30 keywords (multi-cloud, Well-Architected Framework, solution design, etc.)
- Evaluation weights
- 10+ action verbs
- 5+ anti-patterns
- Source references"

echo ""
echo "Creating rule issues..."

gh issue create --repo $REPO --title "[Rule] Detect 'Objective' section at top of CV" \
  --label "rules,good first issue" \
  --body "Add a rule that flags CVs with an 'Objective' or 'Career Objective' section.

**Why:** This format is outdated. Modern CVs should open with a summary containing quantified achievements and proof points, not a generic objective statement.

**Implementation:**
- Add to \`packages/core/src/rules/index.ts\`
- Regex: \`/^#+\s*(career\s+)?objective/im\`
- Severity: minor
- Fix suggestion: 'Replace with a 2-3 line summary showing your top quantified achievement and target role'

**Source:** Multiple recruiter sources confirm objective statements are outdated (TieCV, GetNewResume, 2026 guides)."

gh issue create --repo $REPO --title "[Rule] Detect education-first layout for experienced candidates" \
  --label "rules,good first issue" \
  --body "Flag when Education appears before Experience for candidates with 3+ years of work history.

**Why:** Recruiters spend 6-7 seconds on initial scan. Experience should come first for anyone with professional history.

**Implementation:**
- Check if 'Education' heading appears before 'Experience' heading
- Only flag if there are 2+ job entries (suggests experienced candidate)
- Severity: major
- Fix: 'Move Education below Experience. Lead with your work history.'"

gh issue create --repo $REPO --title "[Rule] Flag CVs longer than 2 pages (word count heuristic)" \
  --label "rules,good first issue" \
  --body "Add a rule that estimates CV length and flags if likely >2 pages.

**Why:** Research shows 1-2 pages is optimal. Longer CVs get less attention and signal poor prioritization.

**Implementation:**
- Heuristic: >800 words of content likely exceeds 2 pages
- Severity: minor for 800-1000 words, major for 1000+
- Fix: 'Cut to 2 pages max. Remove roles older than 10 years or condense to 1 line each.'"

gh issue create --repo $REPO --title "[Rule] Detect inconsistent date formats" \
  --label "rules,good first issue" \
  --body "Flag when a CV mixes date formats (e.g., 'Jan 2022' with '2022-01' or 'January 2022').

**Why:** Inconsistency signals carelessness and can confuse ATS date parsing.

**Implementation:**
- Detect multiple date format patterns in the same document
- Severity: minor
- Fix: 'Use consistent format throughout. Recommended: Mon YYYY (e.g., Jan 2022)'"

gh issue create --repo $REPO --title "[Rule] Flag 'References available upon request'" \
  --label "rules,good first issue" \
  --body "Flag the phrase 'references available upon request' or similar.

**Why:** Universally considered space-wasting. Recruiters assume references are available. This line takes space from actual content.

**Implementation:**
- Regex: \`/references\\s+(available\\s+)?(upon|on)\\s+request/i\`
- Severity: minor
- Fix: 'Remove this line. Use the space for another quantified achievement.'"

echo ""
echo "Creating core engine issues..."

gh issue create --repo $REPO --title "[Core] Add unit tests for evaluator scoring" \
  --label "core,help wanted" \
  --body "Write unit tests for the evaluation scoring in \`packages/core/src/evaluator/index.ts\`.

**Test cases needed:**
- CV with many quantified bullets should score high on 'Quantified Impact'
- CV with shipped/launched language should score high on 'Shipped Evidence'
- CV with GitHub/LinkedIn links should score high on 'Public Proof'
- CV with tables should fail ATS compatibility
- Empty CV should score 1/5 across all dimensions
- CV + JD with keyword overlap should score high on 'Keyword Match'

**Setup:**
- Tests go in \`packages/core/src/evaluator/__tests__/\`
- Use Vitest
- Create fixture CVs in \`packages/core/src/__fixtures__/\`"

gh issue create --repo $REPO --title "[Core] Add unit tests for archetype detection" \
  --label "core,help wanted" \
  --body "Write unit tests for \`detectArchetype()\` in \`packages/core/src/archetypes/index.ts\`.

**Test cases:**
- CV with React/Next.js/CSS → Frontend Engineer
- CV with Kubernetes/Terraform/AWS → DevOps/SRE
- CV with LangChain/RAG/embeddings → AI Engineer
- CV with roadmap/OKRs/A/B testing → AI Product Manager
- CV with mixed signals → reasonable fallback
- JD keywords should influence detection"

gh issue create --repo $REPO --title "[Core] Implement keyword extraction with TF-IDF" \
  --label "core,enhancement" \
  --body "Replace the simple word-splitting keyword extractor with TF-IDF or similar.

**Current state:** \`extractKeywords()\` in evaluator just splits words and removes stop words. This misses multi-word terms and doesn't weight by importance.

**Goals:**
- Extract multi-word terms ('machine learning', 'react native')
- Weight terms by frequency in JD vs general English
- Return top 15-20 most important terms
- Keep it dependency-light (no heavy NLP libraries)

**Approach suggestions:**
- Simple TF-IDF with a small reference corpus
- Or: n-gram extraction + frequency weighting
- Must work in the browser (for web UI)"

gh issue create --repo $REPO --title "[Core] Support YAML-based archetype files" \
  --label "core,enhancement" \
  --body "Allow archetypes to be defined in .yml files instead of only in TypeScript.

**Why:** This makes it much easier for non-developers to contribute archetypes. They can submit a YAML file without knowing TypeScript.

**Format:**
\`\`\`yaml
id: mobile-engineer
name: Mobile Engineer
description: iOS/Android engineers
keywords:
  - swift
  - kotlin
  - react native
evaluationWeights:
  shippedEvidence: 0.25
  quantifiedImpact: 0.20
  # ...
actionVerbs:
  - Built
  - Shipped
antiPatterns:
  - 'familiar with mobile development'
\`\`\`

**Implementation:**
- Add a loader that reads from \`archetypes/*.yml\`
- Validate against the RoleArchetype interface
- Register them alongside the built-in ones"

echo ""
echo "Creating CLI issues..."

gh issue create --repo $REPO --title "[CLI] Add --format json flag to evaluate command" \
  --label "cli,good first issue" \
  --body "Add a \`--format json\` option to the evaluate command that outputs machine-readable JSON.

**Current:** Only human-readable terminal output.
**Goal:** \`cv-builder evaluate cv.md --format json\` outputs the full EvaluationResult as JSON.

**Use case:** Piping into other tools, CI/CD integration, building on top of cv-builder."

gh issue create --repo $REPO --title "[CLI] Add color output" \
  --label "cli,good first issue" \
  --body "Make the CLI output colorful and easier to scan.

**Ideas:**
- Green for strengths, red for critical issues, yellow for warnings
- Score displayed in color (red < 3, yellow 3-4, green 4+)
- Dimension bars in color
- Use a lightweight color library (chalk, picocolors, or kleur)

Keep it readable — colors should help, not distract."

gh issue create --repo $REPO --title "[CLI] Add --archetype flag to override detection" \
  --label "cli,good first issue" \
  --body "Add \`--archetype <id>\` flag to force a specific role type instead of auto-detection.

**Usage:**
\`\`\`bash
cv-builder evaluate cv.md --archetype ai-engineer
cv-builder evaluate cv.md --archetype devops-sre
\`\`\`

**Implementation:**
- Accept the flag in CLI argument parsing
- Pass it to \`evaluate({ archetype: value })\`
- Show error with available archetypes if invalid ID provided
- Add \`--archetype\` to help text"

echo ""
echo "Creating web UI issues..."

gh issue create --repo $REPO --title "[Web] Set up Next.js project with Tailwind" \
  --label "web-ui,help wanted" \
  --body "Initialize the web package (\`apps/web-ui/\`) with a Next.js + Tailwind project.

**Requirements:**
- Next.js 15 (App Router)
- Tailwind CSS 4
- TypeScript
- Import \`@cv-builder/core\` as a workspace dependency
- Basic layout with header + footer
- Dark mode support (system preference)
- Mobile responsive from the start

**Keep it minimal** — just the skeleton. Other issues will add the actual pages."

gh issue create --repo $REPO --title "[Web] Build the CV + JD input screen" \
  --label "web-ui,help wanted" \
  --body "Build the main input page where users paste their CV and job description.

**UI elements:**
- Two text areas (CV on left, JD on right — stacked on mobile)
- File upload support (drag & drop .md, .txt, .pdf)
- 'Evaluate' button
- Character/word count indicator
- Placeholder text showing what to paste

**Behavior:**
- Call \`evaluate()\` from @cv-builder/core on submit
- Navigate to results page with the output
- All processing happens client-side (no API calls)"

gh issue create --repo $REPO --title "[Web] Build the results display component" \
  --label "web-ui,help wanted" \
  --body "Build the results page showing the evaluation output.

**Must show:**
- Overall score (large, prominent)
- 6 dimension scores as visual bars or radar chart
- Strengths list (green checkmarks)
- Issues table (severity, element, why, fix)
- Rewrite suggestions (before → after)
- ATS compatibility badge
- Detected archetype

**Design inspiration:** Think Lighthouse scores (Chrome DevTools) — clear, scannable, actionable."

echo ""
echo "Creating research/docs issues..."

gh issue create --repo $REPO --title "[Research] Add 2026 salary data for European tech roles" \
  --label "research,good first issue" \
  --body "Our market data is US-focused. Add European salary ranges for common tech roles.

**Countries to cover:** Germany, UK, Netherlands, Finland, France, Sweden, Ireland
**Roles:** Software Engineer, AI Engineer, Product Manager, DevOps, Data Engineer

**Output:** Add to \`research/data/market-stats-2026.json\` under a new \`europeanMarket\` key.

**Sources:** levels.fyi, glassdoor, LinkedIn salary insights, Hired.com reports"

gh issue create --repo $REPO --title "[Research] How do ATS rules apply to non-English CVs?" \
  --label "research,help wanted" \
  --body "Our rules are English-centric. Research whether they apply to German, French, Finnish, etc. CVs.

**Questions:**
- Do ATS systems parse non-Latin scripts correctly?
- Are date formats different (and do they matter)?
- Are multi-page CVs more accepted in some markets?
- Does the 'single column' rule apply universally?
- Are there market-specific anti-patterns?

**Output:** A markdown file in \`research/\` summarizing findings with sources."

gh issue create --repo $REPO --title "[Docs] Add Windows setup instructions" \
  --label "docs,good first issue" \
  --body "Test and document the setup process on Windows.

**Check:**
- Does pnpm install work out of the box?
- Any path issues with Windows?
- Does the CLI work in PowerShell and cmd?
- Any WSL-specific notes?

Add a 'Windows' section to the README or CONTRIBUTING.md."

gh issue create --repo $REPO --title "[Docs] Create example CVs (anonymized before/after)" \
  --label "docs,help wanted" \
  --body "Create 3-5 example CV pairs showing before/after improvement.

**Requirements:**
- Fully anonymized (fictional names, companies, numbers)
- Cover different archetypes (engineer, PM, designer)
- Show clear improvement in each case
- Include the score before and after

Put them in \`examples/\` as markdown files."

echo ""
echo "Creating infra issues..."

gh issue create --repo $REPO --title "[CI] Add PR size labeling" \
  --label "chore,good first issue" \
  --body "Add a GitHub Action that auto-labels PRs by size (xs/s/m/l/xl).

**Thresholds:**
- xs: < 10 lines changed
- s: 10-50
- m: 50-200
- l: 200-500
- xl: 500+

This helps reviewers prioritize. Many existing actions do this (like CodeSee, PR Size Labeler)."

echo ""
echo "Done! Created all starter issues."
echo "Run 'gh issue list --repo $REPO' to verify."
