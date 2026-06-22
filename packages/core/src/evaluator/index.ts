import { detectArchetype } from "../archetypes/index.js";
import { UNIVERSAL_RULES } from "../rules/index.js";
import type {
  EvaluateOptions,
  EvaluationDimension,
  EvaluationResult,
  LLMProvider,
  RoleArchetype,
} from "../types.js";

export interface EvaluatorConfig {
  provider?: LLMProvider;
}

/**
 * Evaluates a CV against a job description and returns a scored result.
 *
 * Can run in two modes:
 * 1. Rule-based (no LLM) — fast, deterministic, uses pattern matching
 * 2. LLM-enhanced — deeper analysis using any supported provider
 */
export async function evaluate(
  options: EvaluateOptions,
  config?: EvaluatorConfig
): Promise<EvaluationResult> {
  void config;
  const archetype = options.archetype
    ? (await import("../archetypes/index.js")).getArchetype(options.archetype)
    : detectArchetype(options.cv.content, options.jd?.content);

  const dimensions = scoreDimensions(options, archetype);
  const score = calculateWeightedScore(dimensions);
  const issues = findIssues(options.cv.content, archetype);
  const strengths = findStrengths(options.cv.content, archetype);

  return {
    score,
    dimensions,
    strengths,
    issues,
    rewrites: [],
    archetype,
    atsCompatible: checkAtsCompatibility(options.cv.content),
  };
}

function scoreDimensions(
  options: EvaluateOptions,
  archetype: RoleArchetype
): EvaluationDimension[] {
  const weights = archetype.evaluationWeights;

  return [
    {
      name: "Shipped Evidence",
      weight: weights.shippedEvidence,
      score: scoreShippedEvidence(options.cv.content),
      maxScore: 5,
      feedback: "",
    },
    {
      name: "Quantified Impact",
      weight: weights.quantifiedImpact,
      score: scoreQuantifiedImpact(options.cv.content),
      maxScore: 5,
      feedback: "",
    },
    {
      name: "Tooling Visibility",
      weight: weights.toolingVisibility,
      score: scoreToolingVisibility(options.cv.content, archetype),
      maxScore: 5,
      feedback: "",
    },
    {
      name: "ATS Compatibility",
      weight: weights.atsCompatibility,
      score: checkAtsCompatibility(options.cv.content) ? 5 : 2,
      maxScore: 5,
      feedback: "",
    },
    {
      name: "Keyword Match",
      weight: weights.keywordMatch,
      score: options.jd ? scoreKeywordMatch(options.cv.content, options.jd.content) : 3,
      maxScore: 5,
      feedback: "",
    },
    {
      name: "Public Proof",
      weight: weights.publicProof,
      score: scorePublicProof(options.cv.content),
      maxScore: 5,
      feedback: "",
    },
  ];
}

function calculateWeightedScore(dimensions: EvaluationDimension[]): number {
  const totalWeight = dimensions.reduce((sum, d) => sum + d.weight, 0);
  const weightedSum = dimensions.reduce(
    (sum, d) => sum + (d.score / d.maxScore) * d.weight * 5,
    0
  );
  return Math.round((weightedSum / totalWeight) * 10) / 10;
}

function scoreShippedEvidence(cv: string): number {
  const shippedIndicators = [
    /shipped/i,
    /launched/i,
    /deployed/i,
    /built and released/i,
    /in production/i,
    /live users/i,
    /released to/i,
  ];
  const matches = shippedIndicators.filter((r) => r.test(cv)).length;
  return Math.min(5, Math.max(1, matches + 1));
}

function scoreQuantifiedImpact(cv: string): number {
  const numberPatterns =
    /\d+[%xX]|\$[\d,]+|\d+\+?\s*(users|customers|teams|engineers|requests)/g;
  const matches = cv.match(numberPatterns) || [];
  if (matches.length >= 8) return 5;
  if (matches.length >= 5) return 4;
  if (matches.length >= 3) return 3;
  if (matches.length >= 1) return 2;
  return 1;
}

function scoreToolingVisibility(cv: string, archetype: RoleArchetype): number {
  const found = archetype.keywords.filter((kw) =>
    cv.toLowerCase().includes(kw.toLowerCase())
  );
  const ratio = found.length / Math.max(archetype.keywords.length, 1);
  return Math.min(5, Math.max(1, Math.round(ratio * 5)));
}

function scoreKeywordMatch(cv: string, jd: string): number {
  const jdWords = extractKeywords(jd);
  const matched = jdWords.filter((w) => cv.toLowerCase().includes(w.toLowerCase()));
  const ratio = matched.length / Math.max(jdWords.length, 1);
  if (ratio >= 0.7) return 5;
  if (ratio >= 0.5) return 4;
  if (ratio >= 0.3) return 3;
  if (ratio >= 0.15) return 2;
  return 1;
}

function scorePublicProof(cv: string): number {
  const proofIndicators = [
    /github\.com/i,
    /linkedin\.com/i,
    /medium\.com/i,
    /blog/i,
    /portfolio/i,
    /https?:\/\//,
  ];
  const matches = proofIndicators.filter((r) => r.test(cv)).length;
  return Math.min(5, Math.max(1, matches + 1));
}

function checkAtsCompatibility(cv: string): boolean {
  const issues = [];
  if (/\|.*\|.*\|/m.test(cv)) issues.push("tables");
  if (/[""'']/g.test(cv)) issues.push("smart-quotes");
  return issues.length === 0;
}

function findIssues(cv: string, _archetype: RoleArchetype) {
  const issues: EvaluationResult["issues"] = [];

  for (const pattern of UNIVERSAL_RULES.antiPatterns) {
    if (new RegExp(pattern.match, "i").test(cv)) {
      issues.push({
        element: pattern.name,
        why: pattern.why,
        fix: pattern.fix,
        severity: pattern.severity as "critical" | "major" | "minor",
      });
    }
  }

  const DATE_FORMAT_PATTERNS = [
    { type: "YYYY-MM", regex: /\b\d{4}-\d{2}\b/ },
    { type: "MM-YYYY", regex: /\b\d{2}-\d{4}\b/ },
    { type: "YYYY-YYYY", regex: /\b\d{4}\s*-\s*\d{4}\b/ },
    { type: "Mon YYYY", regex: /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}\b/i }
  ];

  const formats = new Set<string>();

  for (const { type, regex } of DATE_FORMAT_PATTERNS) {
    if (regex.test(cv)) {
      formats.add(type);
    }
  }

  if (formats.size > 1) {
    issues.push({
      element: "Inconsistent date formats",
      why: `Multiple formats detected: ${[...formats].join(", ")}`,
      fix: "Use a consistent format throughout. Recommended: Mon YYYY (e.g., Jan 2022).",
      severity: "minor",
    });
  }

  return issues;
}

function findStrengths(cv: string, archetype: RoleArchetype): string[] {
  const strengths: string[] = [];

  if (/\d+%/.test(cv)) strengths.push("Uses quantified metrics");
  if (/github\.com/i.test(cv)) strengths.push("Links to public code");
  if (/shipped|launched|deployed/i.test(cv)) strengths.push("Shows shipped work");

  const keywordMatches = archetype.keywords.filter((kw) =>
    cv.toLowerCase().includes(kw.toLowerCase())
  );
  if (keywordMatches.length > 3)
    strengths.push(`Strong keyword coverage (${keywordMatches.length} matches)`);

  return strengths;
}

function extractKeywords(jd: string): string[] {
  const stopWords = new Set([
    "the",
    "a",
    "an",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "have",
    "has",
    "had",
    "do",
    "does",
    "did",
    "will",
    "would",
    "could",
    "should",
    "may",
    "might",
    "shall",
    "can",
    "and",
    "or",
    "but",
    "if",
    "in",
    "on",
    "at",
    "to",
    "for",
    "of",
    "with",
    "by",
    "from",
    "as",
    "into",
    "through",
    "during",
    "before",
    "after",
    "above",
    "below",
    "between",
    "we",
    "you",
    "they",
    "this",
    "that",
    "these",
    "those",
    "our",
    "your",
  ]);

  const words = jd
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w));

  return [...new Set(words)];
}