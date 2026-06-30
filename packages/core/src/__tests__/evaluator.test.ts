import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { evaluate } from "../evaluator/index.js";
import { detectArchetype, getArchetype } from "../archetypes/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixtures = resolve(__dirname, "../__fixtures__");

const strongCV = readFileSync(resolve(fixtures, "sample-cv-strong.md"), "utf-8");
const weakCV = readFileSync(resolve(fixtures, "sample-cv-weak.md"), "utf-8");

describe("evaluate", () => {
  it("scores a strong CV higher than a weak CV", async () => {
    const strongResult = await evaluate({
      cv: { content: strongCV, format: "markdown" },
    });
    const weakResult = await evaluate({
      cv: { content: weakCV, format: "markdown" },
    });

    expect(strongResult.score).toBeGreaterThan(weakResult.score);
  });

  it("returns a score between 1 and 5", async () => {
    const result = await evaluate({
      cv: { content: strongCV, format: "markdown" },
    });

    expect(result.score).toBeGreaterThanOrEqual(1);
    expect(result.score).toBeLessThanOrEqual(5);
  });

  it("returns 6 scoring dimensions", async () => {
    const result = await evaluate({
      cv: { content: strongCV, format: "markdown" },
    });

    expect(result.dimensions).toHaveLength(6);
  });

  it("detects anti-patterns in weak CVs", async () => {
    const result = await evaluate({
      cv: { content: weakCV, format: "markdown" },
    });

    expect(result.issues.length).toBeGreaterThan(0);
    const issueNames = result.issues.map((i) => i.element);
    expect(issueNames).toContain("Responsibility without ownership");
  });

  it("finds strengths in strong CVs", async () => {
    const result = await evaluate({
      cv: { content: strongCV, format: "markdown" },
    });

    expect(result.strengths.length).toBeGreaterThan(0);
  });

  it("marks ATS-compatible CVs correctly", async () => {
    const result = await evaluate({
      cv: { content: strongCV, format: "markdown" },
    });

    expect(result.atsCompatible).toBe(true);
  });

  it("scores higher when CV matches JD keywords", async () => {
    const jd =
      "Looking for a Python engineer with PostgreSQL, Redis, and Kafka experience. Must have shipped production systems at scale.";

    const withJD = await evaluate({
      cv: { content: strongCV, format: "markdown" },
      jd: { content: jd },
    });
    const withoutJD = await evaluate({
      cv: { content: strongCV, format: "markdown" },
    });

        expect(
      withJD.dimensions.find((d) => d.name === "Keyword Match")!.score
    ).toBeGreaterThanOrEqual(
      withoutJD.dimensions.find((d) => d.name === "Keyword Match")!.score
    );
  });

  it("supports the classical machine learning engineer archetype", () => {
    const archetype = getArchetype("machine-learning-engineer");

    expect(archetype.name).toBe("Machine Learning Engineer");
    expect(archetype.keywords.length).toBeGreaterThanOrEqual(15);
    expect(archetype.keywords.length).toBeLessThanOrEqual(30);
    expect(archetype.actionVerbs.length).toBeGreaterThanOrEqual(10);
    expect(archetype.antiPatterns.length).toBeGreaterThanOrEqual(5);
  });

  it("detects classical machine learning engineer signals", () => {
    const archetype = detectArchetype(
      "Built scikit-learn and XGBoost models with feature engineering, cross-validation, pandas, NumPy, and MLflow.",
      "Need Python machine learning engineer for model evaluation, hyperparameter tuning, and production model monitoring."
    );

    expect(archetype.id).toBe("machine-learning-engineer");
  });

  describe("ai-product-manager archetype", () => {
    it("supports the ai-product-manager archetype with AI-specific keywords", () => {
      const archetype = getArchetype("ai-product-manager");

      expect(archetype.name).toBe("AI Product Manager");
      expect(archetype.keywords.length).toBeGreaterThanOrEqual(35);
      expect(archetype.actionVerbs.length).toBeGreaterThanOrEqual(14);
      expect(archetype.antiPatterns.length).toBeGreaterThanOrEqual(6);
    });

    it("includes AI/LLM-specific keywords beyond general PM terms", () => {
      const archetype = getArchetype("ai-product-manager");
      const aiKeywords = [
        "rag", "agents", "agentic", "mcp", "evals",
        "fine-tuning", "prompt injection", "semantic search",
        "model serving", "inference",
      ];
      for (const kw of aiKeywords) {
        expect(archetype.keywords).toContain(kw);
      }
    });

    it("has stronger shippedEvidence weight than general archetypes", () => {
      const aiPm = getArchetype("ai-product-manager");
      const backend = getArchetype("backend-engineer");

      expect(aiPm.evaluationWeights.shippedEvidence).toBeGreaterThan(
        backend.evaluationWeights.shippedEvidence
      );
    });

    it("has stronger publicProof weight than general archetypes", () => {
      const aiPm = getArchetype("ai-product-manager");
      const backend = getArchetype("backend-engineer");

      expect(aiPm.evaluationWeights.publicProof).toBeGreaterThan(
        backend.evaluationWeights.publicProof
      );
    });

    it("weights sum to 1.0", () => {
      const archetype = getArchetype("ai-product-manager");
      const { shippedEvidence, quantifiedImpact, toolingVisibility, atsCompatibility, keywordMatch, publicProof } = archetype.evaluationWeights;
      const total = shippedEvidence + quantifiedImpact + toolingVisibility + atsCompatibility + keywordMatch + publicProof;
      expect(total).toBeCloseTo(1.0, 5);
    });

    it("detects ai-product-manager with strong AI PM signals", () => {
      const archetype = detectArchetype(
        "Defined the roadmap for a RAG-powered chatbot. Shipped LLM features with prompt engineering, A/B tested evals, and reduced hallucination rates. Used MCP and Claude Code for prototyping. Published blog posts on AI product strategy.",
        "Looking for an AI Product Manager with experience shipping LLM products, running evals, and managing agentic features."
      );

      expect(archetype.id).toBe("ai-product-manager");
    });

    it("scores higher match ratio for AI-specific content than general PM content", () => {
      const aiPm = getArchetype("ai-product-manager");
      const generalPmText = "Set product roadmap, prioritized backlogs, ran user research, defined OKRs, managed Jira, coordinated sprints, launched features, measured retention and activation funnels.";
      const aiPmText = "Shipped RAG pipelines, reduced hallucination via evals, used prompt engineering, managed agentic product launches with MCP integration, fine-tuning, ran evals, A/B testing on LLM outputs, evaluated token usage, prompt injection guardrails, semantic search, and model serving inference.";

      const generalMatchCount = aiPm.keywords.filter((kw) =>
        generalPmText.toLowerCase().includes(kw.toLowerCase())
      ).length;
      const aiMatchCount = aiPm.keywords.filter((kw) =>
        aiPmText.toLowerCase().includes(kw.toLowerCase())
      ).length;

      expect(aiMatchCount).toBeGreaterThan(generalMatchCount);
    });
  });
});
