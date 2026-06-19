# @cv-builder/eval

Golden fixtures that guard the deterministic intelligence layer. Run with
`pnpm eval` (and in CI).

Each fixture is a folder under `fixtures/`:

- `resume.md` — the input resume
- `jd.md` — optional job description (keyword context)
- `expected.json` — `{ archetype, atsCompatible }`

The harness asserts, without any LLM, that for every fixture the detected
archetype and ATS read match what's expected, and that the resume parses against
the schema. A change that breaks archetype detection or the ATS check fails here.

Scoring *quality* (the LLM-produced `EvalResult`) is out of scope — that needs a
provider adapter, which is a separate surface.
