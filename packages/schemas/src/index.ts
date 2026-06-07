// Zod schemas are the source of truth; types are inferred from them.
// Phase 1 ships evaluation types only — tailoring/rewrite is Phase 2.

export {
  EvaluationWeightsSchema,
  ArchetypeSchema,
  type EvaluationWeights,
  type Archetype,
} from "./archetype.js";

export {
  ResumeSourceSchema,
  ResumeLinkSchema,
  ResumeContactSchema,
  ResumeExperienceSchema,
  ResumeEducationSchema,
  ResumeSchema,
  type ResumeSource,
  type ResumeLink,
  type ResumeContact,
  type ResumeExperience,
  type ResumeEducation,
  type Resume,
} from "./resume.js";

export { JobDescriptionSchema, type JobDescription } from "./job-description.js";

export {
  EvaluationDimensionSchema,
  IssueSchema,
  ClaimSchema,
  EvalResultSchema,
  type EvaluationDimension,
  type Issue,
  type Claim,
  type EvalResult,
} from "./evaluation.js";
