#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { evaluate, listArchetypes } from "@cv-builder/core";
import chalk from "chalk";

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
      console.error(chalk.red(`Unknown command: ${command}\n`));
      printHelp();
      process.exit(1);
  }
}

function colorScore(score: number): string {
  if (score <3) return chalk.red(`${score}/5`);
  if (score <4) return chalk.yellow(`${score}/5`);
  return chalk.green(`${score}/5`);
}

function colorDimScore(score: number, max: number): string {
  if (score<3) return chalk.red(`${score}/${max}`);
  if (score<4) return chalk.yellow(`${score}/${max}`);
  return chalk.green(`${score}/${max}`);
}

function colorBar(score: number, max: number): string {
  const filled = "█".repeat(score);
  const empty = "░".repeat(max - score);
  if (score <3) return chalk.red(filled) + chalk.dim(empty);
  if (score <4) return chalk.yellow(filled) + chalk.dim(empty);
  return chalk.green(filled) + chalk.dim(empty);
}
async function handleEvaluate(args: string[]) {
  const cvPath = args[0];
  const jdFlagIndex = args.indexOf("--jd");
  const jdPath = jdFlagIndex !== -1 ? args[jdFlagIndex + 1] : undefined;

  if (!cvPath) {
    console.error("Usage: cv-builder evaluate <cv-file> [--jd <jd-file>]");
    process.exit(1);
  }

  const cvContent = readFileSync(resolve(cvPath), "utf-8");
  const jdContent = jdPath
    ? readFileSync(resolve(jdPath), "utf-8")
    : undefined;

  const result = await evaluate({
    cv: { content: cvContent, format: "markdown" },
    jd: jdContent ? { content: jdContent } : undefined,
  });

  console.log(`\n  CV Score: ${colorScore(result.score)}\n`);
  console.log(`  Archetype detected: ${chalk.cyan(result.archetype.name)}\n`);
  console.log(chalk.bold("  Dimensions:"));
  for (const dim of result.dimensions) {
    const bar = colorBar(dim.score, dim.maxScore);
    const score = colorDimScore(dim.score, dim.maxScore);
    console.log(`    ${bar} ${score}  ${dim.name}`);
  }

  if (result.strengths.length > 0) {
    console.log(chalk.bold("\n  Strengths:"));
    for (const s of result.strengths) {
      console.log(`    ${chalk.green("✓")} ${s}`);
    }
  }

  if (result.issues.length > 0) {
    console.log(chalk.bold("\n  Issues:"));
    for (const issue of result.issues) {
      if (issue.severity === "critical") {
        console.log(`    ${chalk.red("✗")} ${chalk.red(`[${issue.severity}]`)} ${issue.element}`);
      } else {
        console.log(`    ${chalk.yellow("⚠")} ${chalk.yellow(`[${issue.severity}]`)} ${issue.element}`);
      }
      console.log(`      ${chalk.dim("Why:")} ${issue.why}`);
      console.log(`      ${chalk.dim("Fix:")} ${issue.fix}`);
    }
  }

  console.log(`\n  ATS Compatible: ${result.atsCompatible ? chalk.green("✓ Yes") : chalk.red("✗ No")}\n`);
}

function handleListArchetypes() {
  const archetypes = listArchetypes();
  console.log(chalk.bold("\n  Available role archetypes:\n"));
  for (const a of archetypes) {
    console.log(`    ${chalk.cyan("•")} ${chalk.bold(a.name)} ${chalk.dim(`(${a.id})`)}`);
    console.log(`      ${a.description}`);
    console.log(`      ${chalk.dim("Keywords:")} ${a.keywords.slice(0, 5).join(", ")}...\n`);
  }
}

function printHelp() {
  console.log(`
  ${chalk.bold("CV Builder CLI")} ${chalk.dim("— Evaluate and tailor your CV")}

  ${chalk.bold("USAGE")}
    cv-builder <command> [options]

  ${chalk.bold("COMMANDS")}
    ${chalk.cyan("evaluate")} <cv-file> [--jd <jd-file>]    Score your CV (optionally against a JD)
    ${chalk.cyan("archetypes")}                              List available role archetypes
    ${chalk.cyan("help")}                                    Show this help

  ${chalk.bold("EXAMPLES")}
    cv-builder evaluate ./my-cv.md
    cv-builder evaluate ./my-cv.md --jd ./job-description.md
    cv-builder archetypes

  More commands coming soon: tailor, export, suggest
`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
