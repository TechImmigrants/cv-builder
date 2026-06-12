import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { CLAIM_RULES, RUBRIC, RUBRIC_VERSION } from "@cv-builder/intelligence";
import type { Archetype } from "@cv-builder/schemas";

export const PROMPT_NAMES = ["extract", "score", "validate-claims"] as const;
export type PromptName = (typeof PROMPT_NAMES)[number];

// .md lives next to dist/ and src/ alike, so this resolves in both.
function loadTemplate(name: PromptName): string {
  const path = fileURLToPath(new URL(`../prompts/${name}.md`, import.meta.url));
  return readFileSync(path, "utf-8");
}

export function renderExtractPrompt(): string {
  return loadTemplate("extract");
}

export function renderValidateClaimsPrompt(): string {
  const rules = CLAIM_RULES.map((r) => `- ${r.label}`).join("\n");
  return loadTemplate("validate-claims").replace("{{CLAIM_RULES}}", rules);
}

export interface ScorePromptOptions {
  archetype: Archetype;
  jdKeywords?: string[];
}

export function renderScorePrompt({ archetype, jdKeywords }: ScorePromptOptions): string {
  const weights = Object.entries(archetype.evaluationWeights)
    .map(([key, value]) => `- ${key}: ${value}`)
    .join("\n");

  const rubric = RUBRIC.dimensions
    .map((d) => `- **${d.name}** — ${d.description}\n  - 0: ${d.low}\n  - 5: ${d.high}`)
    .join("\n");

  const keywords =
    jdKeywords && jdKeywords.length > 0
      ? `Match against these JD keywords: ${jdKeywords.join(", ")}.`
      : `No JD provided — match against the role's own keyword set: ${archetype.keywords.join(", ")}.`;

  return loadTemplate("score")
    .replaceAll("{{ARCHETYPE_NAME}}", archetype.name)
    .replaceAll("{{ARCHETYPE_ID}}", archetype.id)
    .replaceAll("{{ARCHETYPE_VERSION}}", archetype.version)
    .replaceAll("{{RUBRIC_VERSION}}", RUBRIC_VERSION)
    .replace("{{WEIGHTS}}", weights)
    .replace("{{RUBRIC}}", rubric)
    .replace("{{JD_KEYWORDS}}", keywords);
}
