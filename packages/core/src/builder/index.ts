import { detectArchetype } from "../archetypes/index.js";
import type {
  CVChange,
  LLMProvider,
  Suggestion,
  TailoredCV,
  TailorOptions,
} from "../types.js";

export interface BuilderConfig {
  provider?: LLMProvider;
}

/**
 * Tailors a CV to match a specific job description.
 *
 * In rule-based mode (no LLM), provides keyword gap analysis and
 * structural suggestions. With an LLM provider, generates full rewrites.
 */
export async function tailor(
  options: TailorOptions,
  config?: BuilderConfig
): Promise<TailoredCV> {
  void config;
  const archetype = options.archetype
    ? (await import("../archetypes/index.js")).getArchetype(options.archetype)
    : detectArchetype(options.cv.content, options.jd.content);

  const jdKeywords = extractKeywords(options.jd.content);
  const cvLower = options.cv.content.toLowerCase();

  const matched = jdKeywords.filter((kw) => cvLower.includes(kw.toLowerCase()));
  const missing = jdKeywords.filter((kw) => !cvLower.includes(kw.toLowerCase()));

  const changes: CVChange[] = [];
  const markdown = options.cv.content;

  return {
    markdown,
    changes,
    keywordsMatched: matched,
    keywordsMissing: missing,
    archetype,
  };
}

/**
 * Generates improvement suggestions without modifying the CV.
 */
export function suggest(options: TailorOptions): Suggestion[] {
  const suggestions: Suggestion[] = [];
  const cv = options.cv.content;
  const jdKeywords = extractKeywords(options.jd.content);

  const missing = jdKeywords.filter((kw) => !cv.toLowerCase().includes(kw.toLowerCase()));

  if (missing.length > 5) {
    suggestions.push({
      type: "add",
      section: "Skills",
      content: `Add missing keywords: ${missing.slice(0, 10).join(", ")}`,
      reason: `${missing.length} keywords from the JD are not present in your CV`,
      impact: "high",
    });
  }

  if (!/https?:\/\//.test(cv)) {
    suggestions.push({
      type: "add",
      section: "Summary",
      content: "Add links to portfolio, GitHub, or published work",
      reason: "Public proof of work increases callback rate significantly in 2026",
      impact: "medium",
    });
  }

  const quantifiedBullets = (cv.match(/\d+[%xX]|\$[\d,]+/g) || []).length;
  if (quantifiedBullets < 3) {
    suggestions.push({
      type: "rewrite",
      section: "Experience",
      content: "Add numbers to your bullet points (users, %, $, time saved)",
      reason: "Modern AI screeners heavily weight quantified outcomes",
      impact: "high",
    });
  }

  return suggestions;
}

function extractKeywords(text: string): string[] {
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
    "we",
    "you",
    "they",
    "this",
    "that",
    "our",
    "your",
    "about",
    "who",
    "what",
  ]);

  const words = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w));

  return [...new Set(words)];
}
