import type { Archetype } from "@cv-builder/schemas";
import { ARCHETYPES, DEFAULT_ARCHETYPE } from "./archetypes/index.js";

function hasKeyword(text: string, keyword: string): boolean {
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // hyphen counts as a word char so "go" doesn't match "go-to-market"
  return new RegExp(`(?<![\\w-])${escaped}(?![\\w-])`).test(text);
}

function countMatches(text: string, keywords: string[]): number {
  return keywords.reduce((n, kw) => (hasKeyword(text, kw.toLowerCase()) ? n + 1 : n), 0);
}

// Picks the archetype whose keywords appear most in the resume. Falls back to
// the default when there's no signal, so detection never returns nothing.
export function detectArchetype(
  resumeText: string,
  archetypes: Archetype[] = ARCHETYPES
): Archetype {
  const text = resumeText.toLowerCase();
  let best = DEFAULT_ARCHETYPE;
  let bestScore = 0;

  for (const archetype of archetypes) {
    const score = countMatches(text, archetype.keywords);
    if (score > bestScore) {
      best = archetype;
      bestScore = score;
    }
  }

  return best;
}
