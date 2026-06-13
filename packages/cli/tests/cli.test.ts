import { describe, it, expect, beforeAll } from "vitest";
import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cliEntry = resolve(__dirname, "../dist/cli.js");

const CV = `# Jane Doe

## Experience

### Senior Engineer — Acme (2021 – 2024)

- Shipped a payments service in Python on PostgreSQL handling 2M requests/day
- Reduced p99 latency from 800ms to 120ms by rewriting the hot path in Rust
- Led migration from Redis to Kafka, cutting infrastructure cost by 35%
`;

let cvPath: string;
let jdPath: string;

beforeAll(() => {
  if (!existsSync(cliEntry)) {
    throw new Error(
      `CLI not built at ${cliEntry}. Run \`pnpm --filter @cv-builder/cli build\` first.`
    );
  }
  const dir = mkdtempSync(resolve(tmpdir(), "cv-builder-cli-test-"));
  cvPath = resolve(dir, "cv.md");
  jdPath = resolve(dir, "jd.md");
  writeFileSync(cvPath, CV, "utf-8");
  writeFileSync(
    jdPath,
    "Looking for a Python engineer with PostgreSQL and Kafka experience.",
    "utf-8"
  );
});

function runCli(args: string[]) {
  return spawnSync("node", [cliEntry, ...args], { encoding: "utf-8" });
}

describe("cv-builder evaluate --format json", () => {
  it("emits a valid EvaluationResult JSON object on stdout", () => {
    const result = runCli(["evaluate", cvPath, "--format", "json"]);

    expect(result.status).toBe(0);
    const parsed = JSON.parse(result.stdout);
    expect(typeof parsed.score).toBe("number");
    expect(Array.isArray(parsed.dimensions)).toBe(true);
    expect(parsed.dimensions.length).toBeGreaterThan(0);
    expect(Array.isArray(parsed.strengths)).toBe(true);
    expect(Array.isArray(parsed.issues)).toBe(true);
    expect(Array.isArray(parsed.rewrites)).toBe(true);
    expect(parsed.archetype).toBeDefined();
    expect(typeof parsed.atsCompatible).toBe("boolean");
  });

  it("works alongside --jd", () => {
    const result = runCli(["evaluate", cvPath, "--jd", jdPath, "--format", "json"]);

    expect(result.status).toBe(0);
    const parsed = JSON.parse(result.stdout);
    expect(typeof parsed.score).toBe("number");
    expect(Array.isArray(parsed.dimensions)).toBe(true);
    expect(parsed.dimensions.length).toBeGreaterThan(0);
    expect(Array.isArray(parsed.strengths)).toBe(true);
    expect(Array.isArray(parsed.issues)).toBe(true);
    expect(Array.isArray(parsed.rewrites)).toBe(true);
    expect(parsed.archetype).toBeDefined();
    expect(typeof parsed.atsCompatible).toBe("boolean");
  });

  it("preserves human-readable output by default", () => {
    const result = runCli(["evaluate", cvPath]);

    expect(result.status).toBe(0);
    expect(result.stdout).toContain("CV Score:");
    expect(() => JSON.parse(result.stdout)).toThrow();
  });

  it("rejects unknown --format values", () => {
    const result = runCli(["evaluate", cvPath, "--format", "yaml"]);

    expect(result.status).not.toBe(0);
    expect(result.stderr).toMatch(/format/i);
  });

  it("rejects missing option values", () => {
    const missingFormat = runCli(["evaluate", cvPath, "--format"]);
    const missingJd = runCli(["evaluate", cvPath, "--jd", "--format", "json"]);

    expect(missingFormat.status).not.toBe(0);
    expect(missingFormat.stderr).toContain("Missing value for --format");
    expect(missingJd.status).not.toBe(0);
    expect(missingJd.stderr).toContain("Missing value for --jd");
  });
});
