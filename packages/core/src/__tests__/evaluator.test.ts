import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { evaluate } from "../evaluator/index.js";

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
      withJD.dimensions.find((d) => d.name === "Keyword Match")?.score
    ).toBeGreaterThanOrEqual(
      withoutJD.dimensions.find((d) => d.name === "Keyword Match")?.score
    );
  });
});
