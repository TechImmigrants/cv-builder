import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  checkAtsCompatibility,
  detectArchetype,
  getArchetype,
} from "@cv-builder/intelligence";
import { ResumeSchema } from "@cv-builder/schemas";
import { describe, expect, it } from "vitest";

const fixturesDir = fileURLToPath(new URL("../../fixtures", import.meta.url));

interface Expected {
  archetype: string;
  atsCompatible: boolean;
  description?: string;
}

interface Fixture {
  name: string;
  resume: string;
  expected: Expected;
}

function loadFixtures(): Fixture[] {
  return readdirSync(fixturesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const dir = `${fixturesDir}/${d.name}`;
      return {
        name: d.name,
        resume: readFileSync(`${dir}/resume.md`, "utf-8"),
        expected: JSON.parse(readFileSync(`${dir}/expected.json`, "utf-8")) as Expected,
      };
    });
}

const fixtures = loadFixtures();

describe("golden fixtures", () => {
  it("covers at least 5 fixtures across at least 3 archetypes", () => {
    expect(fixtures.length).toBeGreaterThanOrEqual(5);
    const archetypes = new Set(fixtures.map((f) => f.expected.archetype));
    expect(archetypes.size).toBeGreaterThanOrEqual(3);
  });

  for (const f of fixtures) {
    describe(f.name, () => {
      it("expects a real archetype", () => {
        expect(getArchetype(f.expected.archetype), f.expected.archetype).toBeDefined();
      });

      it("detects the expected archetype", () => {
        expect(detectArchetype(f.resume).id).toBe(f.expected.archetype);
      });

      it("matches expected ATS compatibility", () => {
        expect(checkAtsCompatibility(f.resume).compatible).toBe(f.expected.atsCompatible);
      });

      it("parses as a Resume", () => {
        expect(ResumeSchema.safeParse({ rawText: f.resume }).success).toBe(true);
      });
    });
  }
});
