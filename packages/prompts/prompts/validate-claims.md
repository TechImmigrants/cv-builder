# Validate Claims

Read a structured resume and check whether its claims are supported by the rest
of the document. Flag the ones that aren't — this is how the candidate learns
what a recruiter will quietly distrust.

## A claim is unsupported when

{{CLAIM_RULES}}

## Instructions

- Pull out the concrete claims (metrics, named tools/tech, scope/seniority).
- Mark each `supported: true` only when something elsewhere backs it up.
- For `supported: false`, say in `reason` what's missing, not just that it's weak.

## Output

Return a JSON array of `Claim` objects:

```json
[
  {
    "text": "string",
    "category": "tool|technology|metric|experience|education|other",
    "supported": true,
    "reason": "string"
  }
]
```

Output only the JSON array. No prose, no code fence.
