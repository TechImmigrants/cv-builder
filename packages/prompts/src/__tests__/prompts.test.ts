import { RUBRIC_VERSION, softwareEngineer } from "@cv-builder/intelligence";
import { describe, expect, it } from "vitest";
import {
  PROMPT_NAMES,
  renderExtractPrompt,
  renderScorePrompt,
  renderValidateClaimsPrompt,
} from "../index.js";

describe("prompt pack", () => {
  it("ships the three Phase 1 prompts", () => {
    expect(PROMPT_NAMES).toEqual(["extract", "score", "validate-claims"]);
  });

  it("each prompt names its output schema", () => {
    expect(renderExtractPrompt()).toContain("Resume");
    expect(renderScorePrompt({ archetype: softwareEngineer })).toContain("EvalResult");
    expect(renderValidateClaimsPrompt()).toContain("Claim");
  });

  it("score prompt embeds the current rubric version", () => {
    const prompt = renderScorePrompt({ archetype: softwareEngineer });
    expect(prompt).toContain(RUBRIC_VERSION);
    expect(prompt).not.toContain("{{");
  });

  it("score prompt injects archetype weights and JD keywords", () => {
    const withJd = renderScorePrompt({
      archetype: softwareEngineer,
      jdKeywords: ["kubernetes", "graphql"],
    });
    expect(withJd).toContain("shippedEvidence:");
    expect(withJd).toContain("kubernetes, graphql");

    const withoutJd = renderScorePrompt({ archetype: softwareEngineer });
    expect(withoutJd).toContain("No JD provided");
  });

  it("validate-claims prompt injects the claim rules", () => {
    const prompt = renderValidateClaimsPrompt();
    expect(prompt).not.toContain("{{CLAIM_RULES}}");
    expect(prompt).toContain("tool or technology listed but never shown");
  });
});
