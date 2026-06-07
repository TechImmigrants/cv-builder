import type { Archetype } from "@cv-builder/schemas";
import { ARCHETYPES, DEFAULT_ARCHETYPE } from "./archetypes/index.js";

function countMatches(text: string, keywords: string[]): number {
  return keywords.reduce((n, kw) => (text.includes(kw.toLowerCase()) ? n + 1 : n), 0);
}

// Picks the archetype whose keywords appear most in the resume. Falls back to
// the default when there's no signal, so detection never returns nothing.
export function detectArchetype(
  resumeText: string,
  archetypes: Archetype[] = ARCHETYPES,
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
