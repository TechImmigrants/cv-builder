# Score Resume

Score a structured resume against the rubric for a target role. Be specific and
honest — generic praise is useless to the candidate.

## Target role

- Archetype: {{ARCHETYPE_NAME}} (`{{ARCHETYPE_ID}}`, v{{ARCHETYPE_VERSION}})
- Rubric version: {{RUBRIC_VERSION}}

### Dimension weights

{{WEIGHTS}}

## Rubric

Score each dimension 0–5 using these anchors:

{{RUBRIC}}

## Keyword context

{{JD_KEYWORDS}}

## Instructions

1. Score every dimension 0–5 with one sentence of grounded feedback.
2. Overall `score` = sum(dimension score × weight), kept on the 0–5 scale.
3. List concrete `strengths`.
4. Surface **at least 3** `issues`. Each must quote the exact resume text it
   refers to (`quote`) and give a concrete `fix`.
5. Set `atsCompatible` from the ATS dimension.
6. Echo back `rubricVersion`, `archetypeVersion`, `archetypeId`, `archetypeName`.

## Output

Return a single JSON object matching the `EvalResult` schema:

```json
{
  "rubricVersion": "{{RUBRIC_VERSION}}",
  "archetypeVersion": "{{ARCHETYPE_VERSION}}",
  "archetypeId": "{{ARCHETYPE_ID}}",
  "archetypeName": "{{ARCHETYPE_NAME}}",
  "score": 0,
  "dimensions": [
    { "name": "string", "weight": 0, "score": 0, "maxScore": 5, "feedback": "string" }
  ],
  "strengths": ["string"],
  "issues": [
    {
      "element": "string",
      "quote": "string",
      "why": "string",
      "fix": "string",
      "severity": "critical|major|minor"
    }
  ],
  "claims": [],
  "atsCompatible": true
}
```

Output only the JSON. No prose, no code fence.
