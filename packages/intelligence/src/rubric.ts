export const RUBRIC_VERSION = "1.0.0";

// `key` matches a field in EvaluationWeights so a dimension and its archetype
// weight always line up.
export interface RubricDimension {
  key:
    | "shippedEvidence"
    | "quantifiedImpact"
    | "toolingVisibility"
    | "atsCompatibility"
    | "keywordMatch"
    | "publicProof";
  name: string;
  description: string;
  // What a 0 vs a 5 looks like, used by the score prompt as anchors.
  low: string;
  high: string;
}

export const RUBRIC_DIMENSIONS: RubricDimension[] = [
  {
    key: "shippedEvidence",
    name: "Shipped Evidence",
    description: "Real work that reached production, with named tools and outcomes.",
    low: "Responsibilities only; nothing shows it shipped.",
    high: "Every role names what was built, for whom, and the result.",
  },
  {
    key: "quantifiedImpact",
    name: "Quantified Impact",
    description: "Numbers that frame scope, speed, adoption, or savings.",
    low: "No metrics anywhere.",
    high: "Most bullets carry a concrete, credible number.",
  },
  {
    key: "toolingVisibility",
    name: "Tech/Tool Visibility",
    description: "Named technologies that match the target role.",
    low: "Vague or no tech named.",
    high: "Relevant stack is explicit and used in context, not just listed.",
  },
  {
    key: "atsCompatibility",
    name: "ATS Compatibility",
    description: "Single column, standard headings, parseable formatting.",
    low: "Tables, columns, or graphics that parsers mangle.",
    high: "Clean single-column text an ATS reads without loss.",
  },
  {
    key: "keywordMatch",
    name: "Keyword Match",
    description: "Overlap with the JD when provided, else the role-family keyword set.",
    low: "Misses the terms the role screens for.",
    high: "Naturally covers the role's expected keywords.",
  },
  {
    key: "publicProof",
    name: "Public Proof Surface",
    description: "GitHub, portfolio, blog, or other verifiable presence.",
    low: "No links or external proof.",
    high: "Working links that back up the claims.",
  },
];

export const RUBRIC = {
  version: RUBRIC_VERSION,
  dimensions: RUBRIC_DIMENSIONS,
} as const;
