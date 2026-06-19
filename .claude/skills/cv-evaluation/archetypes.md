# Archetypes

Each role archetype (keywords, dimension weights, action verbs, anti-patterns)
is one file in `packages/intelligence/src/archetypes/`. Read the relevant file —
the weights there drive the overall score, so use them exactly.

To detect the archetype: count how many of each archetype's keywords appear in
the resume and pick the highest. The same heuristic is implemented in
`packages/intelligence/src/detect.ts` (`detectArchetype`). When nothing clearly
matches, use Software Engineer.
