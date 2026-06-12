# @cv-builder/intelligence

The scoring brain the prompts and skill reference: the fixed rubric, the role
archetypes, and the validator specs.

- **Rubric v1** — six dimensions (Shipped Evidence, Quantified Impact, Tech/Tool
  Visibility, ATS Compatibility, Keyword Match, Public Proof) with 0–5 anchors,
  tagged `RUBRIC_VERSION`.
- **Archetypes** — role config (keywords, dimension weights, action verbs,
  anti-patterns). Ships Software Engineer, Product Manager, Data & ML Engineer.
  Add one by dropping a file in `src/archetypes/` and registering it.
- **Validators** — `checkAtsCompatibility()` plus the ATS and claim rule sets
  the prompts encode.

`detectArchetype(resumeText)` picks the best-matching archetype, falling back to
Software Engineer when there's no signal.
