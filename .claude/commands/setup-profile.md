---
description: Gather a resume to evaluate, three ways
argument-hint: [path-to-file]
---

Help the user get a resume ready for `/evaluate-cv`. Pick the path that fits:

1. **File** — if `$ARGUMENTS` names a file, read it and confirm what you found.
2. **Paste** — if they pasted resume text, use it directly.
3. **Interview** — if they have nothing prepared, ask a short, focused set of
   questions (roles, dates, what they built, measurable outcomes, links) and
   assemble a plain-text resume from their answers.

Once you have the resume text, save it to a file the user chooses and tell them
to run `/evaluate-cv <that-file>`. Don't invent details they didn't give you.
