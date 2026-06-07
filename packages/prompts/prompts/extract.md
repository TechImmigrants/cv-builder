# Extract Resume

You are given the raw text of a resume. Convert it into a structured object.

## Rules

- Use only what's in the text. Do not invent employers, dates, metrics, or links.
- Leave a field empty (or its array `[]`) when the text doesn't contain it.
- Put the full, unmodified source text in `rawText` so later steps can quote it.
- Normalize obvious formatting noise (stray bullets, page numbers) out of fields,
  but never change the wording of achievements.

## Output

Return a single JSON object matching the `Resume` schema:

```json
{
  "name": "string | omit",
  "headline": "string | omit",
  "summary": "string | omit",
  "contact": { "email": "string?", "phone": "string?", "location": "string?" },
  "links": [{ "type": "github|linkedin|portfolio|blog|website|other", "url": "string" }],
  "experience": [
    {
      "company": "string",
      "role": "string",
      "startDate": "string?",
      "endDate": "string?",
      "bullets": ["string"]
    }
  ],
  "education": [
    { "institution": "string", "degree": "string?", "field": "string?", "year": "string?" }
  ],
  "skills": ["string"],
  "rawText": "string"
}
```

Output only the JSON. No prose, no code fence.
