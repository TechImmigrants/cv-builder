#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { evaluate, listArchetypes } from "@cv-builder/core";

const [, , command, ...args] = process.argv;

async function main() {
  switch (command) {
    case "evaluate":
    case "score":
      await handleEvaluate(args);
      break;
    case "archetypes":
      handleListArchetypes();
      break;
    case "help":
    case "--help":
    case "-h":
    case undefined:
      printHelp();
      break;
    default:
      console.error(`Unknown command: ${command}\n`);
      printHelp();
      process.exit(1);
  }
}

async function handleEvaluate(args: string[]) {
  const cvPath = args[0];
  const jdPath = readOptionValue(args, "--jd");
  const format = readOptionValue(args, "--format") ?? "text";

  if (!cvPath) {
    console.error(
      "Usage: cv-builder evaluate <cv-file> [--jd <jd-file>] [--format <text|json>]"
    );
    process.exit(1);
  }

  if (format !== "text" && format !== "json") {
    console.error(`Unknown --format value: ${format}. Supported: text, json`);
    process.exit(1);
  }

  const cvContent = readFileSync(resolve(cvPath), "utf-8");
  const jdContent = jdPath ? readFileSync(resolve(jdPath), "utf-8") : undefined;

  const result = await evaluate({
    cv: { content: cvContent, format: "markdown" },
    jd: jdContent ? { content: jdContent } : undefined,
  });

  if (format === "json") {
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  console.log(`\n  CV Score: ${result.score}/5\n`);
  console.log(`  Archetype detected: ${result.archetype.name}\n`);
  console.log("  Dimensions:");
  for (const dim of result.dimensions) {
    const bar = "█".repeat(dim.score) + "░".repeat(dim.maxScore - dim.score);
    console.log(`    ${bar} ${dim.score}/${dim.maxScore}  ${dim.name}`);
  }

  if (result.strengths.length > 0) {
    console.log("\n  Strengths:");
    for (const s of result.strengths) {
      console.log(`    ✓ ${s}`);
    }
  }

  if (result.issues.length > 0) {
    console.log("\n  Issues:");
    for (const issue of result.issues) {
      const icon = issue.severity === "critical" ? "✗" : "⚠";
      console.log(`    ${icon} [${issue.severity}] ${issue.element}`);
      console.log(`      Why: ${issue.why}`);
      console.log(`      Fix: ${issue.fix}`);
    }
  }

  console.log(`\n  ATS Compatible: ${result.atsCompatible ? "✓ Yes" : "✗ No"}\n`);
}

function readOptionValue(args: string[], option: string): string | undefined {
  const index = args.indexOf(option);
  if (index === -1) {
    return undefined;
  }

  const value = args[index + 1];
  if (!value || value.startsWith("--")) {
    console.error(`Missing value for ${option}`);
    process.exit(1);
  }

  return value;
}

function handleListArchetypes() {
  const archetypes = listArchetypes();
  console.log("\n  Available role archetypes:\n");
  for (const a of archetypes) {
    console.log(`    • ${a.name} (${a.id})`);
    console.log(`      ${a.description}`);
    console.log(`      Keywords: ${a.keywords.slice(0, 5).join(", ")}...\n`);
  }
}

function printHelp() {
  console.log(`
  CV Builder CLI — Evaluate and tailor your CV

  USAGE
    cv-builder <command> [options]

  COMMANDS
    evaluate <cv-file> [--jd <jd-file>] [--format <text|json>]
                                            Score your CV (optionally against a JD).
                                            Use --format json for machine-readable output.
    archetypes                              List available role archetypes
    help                                    Show this help

  EXAMPLES
    cv-builder evaluate ./my-cv.md
    cv-builder evaluate ./my-cv.md --jd ./job-description.md
    cv-builder evaluate ./my-cv.md --format json
    cv-builder archetypes

  More commands coming soon: tailor, export, suggest
`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
