# Scoring

The scoring instructions and exact output shape are in
`packages/prompts/prompts/score.md`. Fill its `{{...}}` placeholders from the
detected archetype's weights and the rubric.

Hold the line on quality:

- Every issue quotes the exact resume text it's about — no paraphrasing.
- Every issue has a concrete fix, not "consider improving this".
- Overall score = sum(dimension score × weight), on the 0–5 scale.
- Be honest. A weak resume should score low; inflating it doesn't help anyone.
