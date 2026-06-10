import { describe, it, expect } from "vitest";
import { evaluate } from "../evaluator/index.js";
import { UNIVERSAL_RULES } from "../rules/index.js";

describe("UNIVERSAL_RULES", () => {
  it("should have anti-patterns defined", () => {
    expect(UNIVERSAL_RULES.antiPatterns).toBeDefined();
    expect(UNIVERSAL_RULES.antiPatterns.length).toBeGreaterThan(0);
  });

  it("compiles all anti-pattern regexes", () => {
    for (const pattern of UNIVERSAL_RULES.antiPatterns) {
      expect(() => new RegExp(pattern.match, "i")).not.toThrow();
    }
  });

  it("does not flag modern tools", async () => {
    const result = await evaluate({
      cv: {
        content: "Built a frontend with React, deployed via GitHub Actions with Vite.",
        format: "markdown",
      },
    });

    const outdatedIssues = result.issues.filter((i) =>
      [
        "Outdated tool without modern stack",
        "Outdated tool with modern stack",
        "Heroku deployment timeline 2024 and below",
        "Heroku deployment timeline post 2024",
      ].includes(i.element)
    );

    expect(outdatedIssues).toHaveLength(0);
  });

  it("flags outdated tooling alone as major", async () => {
    const result = await evaluate({
      cv: {
        content: "Built several legacy apps using jQuery, Backbone.js, and Grunt.",
        format: "markdown",
      },
    });

    const issue = result.issues.find(
      (i) => i.element === "Outdated tool without modern stack"
    );

    expect(issue).toBeDefined();
    expect(issue?.severity).toBe("major");
  });

  it("flags outdated tooling with modern stack as minor", async () => {
    const result = await evaluate({
      cv: {
        content:
          "Built a frontend with jQuery and React, deployed via GitHub Actions with Vite.",
        format: "markdown",
      },
    });

    const issue = result.issues.find(
      (i) => i.element === "Outdated tool with modern stack"
    );

    expect(issue).toBeDefined();
    expect(issue?.severity).toBe("minor");
  });

  it("flags AngularJS (v1)", async () => {
    const result = await evaluate({
      cv: {
        content: "Built a frontend with AngularJS.",
        format: "markdown",
      },
    });

    const issue = result.issues.find(
      (i) => i.element === "Outdated tool without modern stack"
    );

    expect(issue).toBeDefined();
    expect(issue?.severity).toBe("major");
  });

  it("does not flag Angular (v2+)", async () => {
    const result = await evaluate({
      cv: {
        content: "Built a frontend with Angular.",
        format: "markdown",
      },
    });

    const issue = result.issues.find(
      (i) =>
        i.element === "Outdated tool without modern stack" ||
        i.element === "Outdated tool with modern stack"
    );
    expect(issue).toBeUndefined();
  });

  it("flags Heroku post 2024 as major", async () => {
    const result = await evaluate({
      cv: {
        content: "Built, deployed, and monitored several apps on Heroku in 2025.",
        format: "markdown",
      },
    });

    const issue = result.issues.find(
      (i) => i.element === "Heroku deployment timeline post 2024"
    );

    expect(issue).toBeDefined();
    expect(issue?.severity).toBe("major");
  });

  it("flags Heroku 2024 and below as minor", async () => {
    const result = await evaluate({
      cv: {
        content: "Built, deployed, and monitored several apps on Heroku in 2024.",
        format: "markdown",
      },
    });

    const issue = result.issues.find(
      (i) => i.element === "Heroku deployment timeline 2024 and below"
    );

    expect(issue).toBeDefined();
    expect(issue?.severity).toBe("minor");
  });

  it("flags Heroku without date as major", async () => {
    const result = await evaluate({
      cv: {
        content: "Built, deployed, and monitored several apps on Heroku.",
        format: "markdown",
      },
    });

    const issue = result.issues.find(
      (i) => i.element === "Heroku deployment timeline post 2024"
    );

    expect(issue).toBeDefined();
    expect(issue?.severity).toBe("major");
  });

  it("flags SVN without Git as major", async () => {
    const result = await evaluate({
      cv: {
        content: "Managed codebase using SVN for version control.",
        format: "markdown",
      },
    });

    const issue = result.issues.find(
      (i) => i.element === "Outdated tool without modern stack"
    );

    expect(issue).toBeDefined();
    expect(issue?.severity).toBe("major");
  });

  it("flags SVN with Git as minor", async () => {
    const result = await evaluate({
      cv: {
        content: "Managed codebase using SVN and Git for version control.",
        format: "markdown",
      },
    });

    const issue = result.issues.find(
      (i) => i.element === "Outdated tool with modern stack"
    );

    expect(issue).toBeDefined();
    expect(issue?.severity).toBe("minor");
  });

  it("flags Grunt/Gulp without modern bundler as major", async () => {
    const result = await evaluate({
      cv: {
        content: "Built frontend assets using Grunt and Gulp.",
        format: "markdown",
      },
    });

    const issue = result.issues.find(
      (i) => i.element === "Outdated tool without modern stack"
    );
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe("major");
  });

  it("flags Grunt/Gulp with modern bundler as minor", async () => {
    const result = await evaluate({
      cv: {
        content: "Built frontend assets using Grunt and Vite.",
        format: "markdown",
      },
    });
    const issue = result.issues.find(
      (i) => i.element === "Outdated tool with modern stack"
    );
    expect(issue).toBeDefined();
    expect(issue?.severity).toBe("minor");
  });
});
