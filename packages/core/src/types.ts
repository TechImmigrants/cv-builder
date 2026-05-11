/**
 * Core types for the CV Builder evaluation and tailoring engine.
 *
 * These interfaces define the contract between the core engine and all consumers
 * (CLI, web UI, Cursor skill, VS Code extension, etc.).
 */

// --- Evaluation Types ---

export interface EvaluationDimension {
  name: string;
  weight: number;
  score: number;
  maxScore: number;
  feedback: string;
}

export interface Issue {
  element: string;
  why: string;
  fix: string;
  severity: "critical" | "major" | "minor";
}

export interface Rewrite {
  original: string;
  improved: string;
  reason: string;
}

export interface EvaluationResult {
  score: number;
  dimensions: EvaluationDimension[];
  strengths: string[];
  issues: Issue[];
  rewrites: Rewrite[];
  archetype: RoleArchetype;
  atsCompatible: boolean;
}

// --- Builder Types ---

export interface TailoredCV {
  markdown: string;
  changes: CVChange[];
  keywordsMatched: string[];
  keywordsMissing: string[];
  archetype: RoleArchetype;
}

export interface CVChange {
  section: string;
  original: string;
  tailored: string;
  reason: string;
}

export interface Suggestion {
  type: "add" | "remove" | "rewrite" | "reorder";
  section: string;
  content: string;
  reason: string;
  impact: "high" | "medium" | "low";
}

// --- Role Archetypes ---

export interface RoleArchetype {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  evaluationWeights: EvaluationWeights;
  actionVerbs: string[];
  antiPatterns: string[];
}

export interface EvaluationWeights {
  shippedEvidence: number;
  quantifiedImpact: number;
  toolingVisibility: number;
  atsCompatibility: number;
  keywordMatch: number;
  publicProof: number;
}

// --- Input Types ---

export interface CVInput {
  content: string;
  format: "markdown" | "plaintext" | "html";
}

export interface JobDescription {
  content: string;
  url?: string;
  company?: string;
  title?: string;
}

export interface EvaluateOptions {
  cv: CVInput;
  jd?: JobDescription;
  archetype?: string;
  locale?: string;
}

export interface TailorOptions {
  cv: CVInput;
  jd: JobDescription;
  archetype?: string;
  preserveSections?: string[];
  locale?: string;
}

// --- Provider Types (LLM-agnostic) ---

export interface LLMProvider {
  name: string;
  evaluate(prompt: string): Promise<string>;
}

export interface ProviderConfig {
  provider: "openai" | "anthropic" | "local" | "ollama";
  model?: string;
  apiKey?: string;
  baseUrl?: string;
}
