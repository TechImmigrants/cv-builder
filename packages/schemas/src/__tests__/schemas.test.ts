import { describe, expect, it } from "vitest";
import {
  ArchetypeSchema,
  EvalResultSchema,
  ResumeSchema,
} from "../index.js";

const validEvalResult = {
  rubricVersion: "1.0.0",
  archetypeVersion: "1.0.0",
  archetypeId: "software-engineer",
  archetypeName: "Software Engineer",
  score: 3.4,
  dimensions: [
    {
      name: "Shipped Evidence",
      weight: 0.3,
      score: 4,
      feedback: "Strong production work with named outcomes.",
    },
  ],
  strengths: ["Clear quantified impact"],
  issues: [
    {
      element: "Summary",
      quote: "Passionate team player",
      why: "Generic phrasing with no evidence.",
      fix: "Replace with a concrete, measurable achievement.",
      severity: "major",
    },
  ],
  claims: [
    {
      text: "Scaled system to 1M users",
      category: "metric",
      supported: false,
      reason: "No corroborating detail elsewhere in the resume.",
    },
  ],
  atsCompatible: true,
};

describe("EvalResultSchema", () => {
  it("parses a well-formed result", () => {
    expect(() => EvalResultSchema.parse(validEvalResult)).not.toThrow();
  });

  it("rejects a malformed result", () => {
    const bad = { ...validEvalResult, score: "high" };
    expect(EvalResultSchema.safeParse(bad).success).toBe(false);
  });

  it("requires rubricVersion and archetypeVersion", () => {
    for (const field of ["rubricVersion", "archetypeVersion"]) {
      const partial = { ...validEvalResult };
      delete (partial as Record<string, unknown>)[field];
      const result = EvalResultSchema.safeParse(partial);
      expect(result.success, `${field} should be required`).toBe(false);
    }
  });

  it("rejects an out-of-range dimension score", () => {
    const bad = {
      ...validEvalResult,
      dimensions: [{ ...validEvalResult.dimensions[0], score: 7 }],
    };
    expect(EvalResultSchema.safeParse(bad).success).toBe(false);
  });
});

describe("ResumeSchema", () => {
  it("applies array/object defaults from rawText alone", () => {
    const resume = ResumeSchema.parse({ rawText: "Jane Doe — Engineer" });
    expect(resume.links).toEqual([]);
    expect(resume.skills).toEqual([]);
    expect(resume.contact).toEqual({});
  });
});

describe("ArchetypeSchema", () => {
  it("requires at least one keyword", () => {
    const archetype = {
      id: "software-engineer",
      name: "Software Engineer",
      description: "Builds and ships software",
      keywords: [],
      evaluationWeights: {
        shippedEvidence: 0.3,
        quantifiedImpact: 0.2,
        toolingVisibility: 0.2,
        atsCompatibility: 0.1,
        keywordMatch: 0.1,
        publicProof: 0.1,
      },
      actionVerbs: ["Built"],
      antiPatterns: ["familiar with"],
      version: "1.0.0",
    };
    expect(ArchetypeSchema.safeParse(archetype).success).toBe(false);
  });
});
