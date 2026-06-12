import { z } from "zod";

export const EvaluationDimensionSchema = z.object({
  name: z.string(),
  weight: z.number().min(0).max(1),
  score: z.number().int().min(0).max(5),
  feedback: z.string(),
});
export type EvaluationDimension = z.infer<typeof EvaluationDimensionSchema>;

export const IssueSchema = z.object({
  element: z.string(),
  quote: z.string().optional(),
  why: z.string(),
  fix: z.string(),
  severity: z.enum(["critical", "major", "minor"]),
});
export type Issue = z.infer<typeof IssueSchema>;

export const ClaimSchema = z.object({
  text: z.string(),
  category: z.enum([
    "tool",
    "technology",
    "metric",
    "experience",
    "education",
    "other",
  ]),
  supported: z.boolean(),
  reason: z.string(),
});
export type Claim = z.infer<typeof ClaimSchema>;

// Versions are required so old results stay reproducible when the rubric or an
// archetype changes later.
export const EvalResultSchema = z.object({
  rubricVersion: z.string(),
  archetypeVersion: z.string(),
  archetypeId: z.string(),
  archetypeName: z.string(),
  score: z.number().min(0).max(5),
  dimensions: z.array(EvaluationDimensionSchema),
  strengths: z.array(z.string()).default([]),
  issues: z.array(IssueSchema).default([]),
  claims: z.array(ClaimSchema).default([]),
  atsCompatible: z.boolean(),
  locale: z.string().optional(),
});
export type EvalResult = z.infer<typeof EvalResultSchema>;
