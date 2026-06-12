// What the validate-claims prompt treats as an unsupported claim. The check is
// LLM-driven; this is the shared spec it encodes.
export const CLAIM_RULES = [
  {
    id: "metric-without-context",
    label: "A number with no scope, baseline, or how it was achieved",
  },
  {
    id: "tool-never-used",
    label: "A tool or technology listed but never shown in any bullet",
  },
  {
    id: "seniority-without-scope",
    label: "A leadership or scale claim with no team size, budget, or reach",
  },
  {
    id: "vague-superlative",
    label: "Superlatives ('world-class', 'expert') with nothing backing them",
  },
] as const;
