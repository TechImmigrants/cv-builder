// Zod schemas are the source of truth; types are inferred from them.
// Phase 1 ships evaluation types only — tailoring/rewrite is Phase 2.

export {
  type Archetype,
  ArchetypeSchema,
  type EvaluationWeights,
  EvaluationWeightsSchema,
} from "./archetype.js";
export {
  type Claim,
  ClaimSchema,
  type EvalResult,
  EvalResultSchema,
  type EvaluationDimension,
  EvaluationDimensionSchema,
  type Issue,
  IssueSchema,
} from "./evaluation.js";

export { type JobDescription, JobDescriptionSchema } from "./job-description.js";
export {
  type Resume,
  type ResumeContact,
  ResumeContactSchema,
  type ResumeEducation,
  ResumeEducationSchema,
  type ResumeExperience,
  ResumeExperienceSchema,
  type ResumeLink,
  ResumeLinkSchema,
  ResumeSchema,
  type ResumeSource,
  ResumeSourceSchema,
} from "./resume.js";
