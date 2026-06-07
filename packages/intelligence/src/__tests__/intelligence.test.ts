import { ArchetypeSchema } from "@cv-builder/schemas";
import { describe, expect, it } from "vitest";
import {
  ARCHETYPES,
  RUBRIC,
  checkAtsCompatibility,
  detectArchetype,
} from "../index.js";

describe("archetypes", () => {
  it("ships at least 3, each valid against the schema", () => {
    expect(ARCHETYPES.length).toBeGreaterThanOrEqual(3);
    for (const archetype of ARCHETYPES) {
      expect(ArchetypeSchema.safeParse(archetype).success, archetype.id).toBe(true);
    }
  });

  it("has weights summing to 1.0", () => {
    for (const { id, evaluationWeights } of ARCHETYPES) {
      const sum = Object.values(evaluationWeights).reduce((a, b) => a + b, 0);
      expect(sum, id).toBeCloseTo(1, 5);
    }
  });

  it("covers every rubric dimension with a weight", () => {
    const keys = RUBRIC.dimensions.map((d) => d.key).sort();
    for (const { id, evaluationWeights } of ARCHETYPES) {
      expect(Object.keys(evaluationWeights).sort(), id).toEqual(keys);
    }
  });
});

describe("detectArchetype", () => {
  it("detects a software engineer resume", () => {
    const text = "Built React and Node services, scaled Postgres, deployed on Kubernetes.";
    expect(detectArchetype(text).id).toBe("software-engineer");
  });

  it("detects a product manager resume", () => {
    const text = "Owned the roadmap, ran A/B testing and user research, grew retention.";
    expect(detectArchetype(text).id).toBe("product-manager");
  });

  it("falls back to the default on no signal", () => {
    expect(detectArchetype("hello world").id).toBe("software-engineer");
  });
});

describe("checkAtsCompatibility", () => {
  it("flags a table layout", () => {
    expect(checkAtsCompatibility("| Skills | Years |\n| React | 5 |").compatible).toBe(false);
  });

  it("passes clean single-column text", () => {
    const text = "Experience\nBuilt things at Acme.\nContact: jane@example.com";
    expect(checkAtsCompatibility(text).compatible).toBe(true);
  });
});
