import { z } from "zod";

export const EvaluationWeightsSchema = z.object({
  shippedEvidence: z.number().min(0).max(1),
  quantifiedImpact: z.number().min(0).max(1),
  toolingVisibility: z.number().min(0).max(1),
  atsCompatibility: z.number().min(0).max(1),
  keywordMatch: z.number().min(0).max(1),
  publicProof: z.number().min(0).max(1),
});
export type EvaluationWeights = z.infer<typeof EvaluationWeightsSchema>;

// Weights are expected to sum to ~1.0, but that's enforced in the intelligence
// layer so a half-edited archetype still parses here.
export const ArchetypeSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  keywords: z.array(z.string()).min(1),
  evaluationWeights: EvaluationWeightsSchema,
  actionVerbs: z.array(z.string()),
  antiPatterns: z.array(z.string()),
  version: z.string(),
});
export type Archetype = z.infer<typeof ArchetypeSchema>;
