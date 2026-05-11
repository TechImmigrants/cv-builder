# Research

This directory contains the evidence base that powers CV Builder's rules and scoring.

Every rule in the engine should trace back to research. If you're adding a new rule, include a source.

## Structure

```
research/
├── data/
│   ├── market-stats-2026.json    # Hard numbers (salary, application rates, etc.)
│   ├── ats-rules.json            # ATS compatibility research
│   └── keywords-by-role.json     # Keyword frequency data by role type
├── sources.md                    # All sources with URLs and dates
└── README.md                     # This file
```

## Contributing Research

1. Find a credible source (recruiter blogs, hiring manager interviews, industry surveys, job board data)
2. Add it to `sources.md` with URL and date accessed
3. If it yields a concrete rule, add the rule to `packages/core/src/rules/`
4. If it yields keywords for an archetype, add them to the relevant archetype file

## Quality Bar

- Primary sources preferred (actual recruiters, hiring data) over opinion pieces
- Date matters: 2025-2026 data preferred over older research
- Quantified claims need a source citation
- Anecdotal advice is acceptable if it comes from a named expert with credentials
