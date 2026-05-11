# @cv-builder/web

The browser-based UI for CV Builder.

## Status: Not yet started

This package is waiting for contributors. See the issue tracker for available tasks.

## Design Principles

1. **Privacy-first** — No data leaves the browser in default mode
2. **No account required** — Works immediately, no sign-up
3. **Fast** — Rule-based scoring is instant, LLM mode is opt-in
4. **Accessible** — WCAG 2.1 AA compliant
5. **Mobile-friendly** — Works on phone for quick checks

## Planned Stack

- Next.js (or Vite + React — to be decided by contributors)
- Tailwind CSS
- @cv-builder/core for all scoring logic

## Key Screens

1. **Home** — Paste CV + JD, get score
2. **Results** — Dimension breakdown, issues, rewrites
3. **Editor** — Side-by-side CV tailoring
4. **Export** — PDF / Markdown / DOCX download
