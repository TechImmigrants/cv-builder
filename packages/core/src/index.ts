export {
  detectArchetype,
  getArchetype,
  listArchetypes,
  registerArchetype,
} from "./archetypes/index.js";
export { suggest, tailor } from "./builder/index.js";
export { evaluate } from "./evaluator/index.js";
export { UNIVERSAL_RULES } from "./rules/index.js";
export type {
  CVChange,
  CVInput,
  EvaluateOptions,
  EvaluationDimension,
  EvaluationResult,
  EvaluationWeights,
  Issue,
  JobDescription,
  LLMProvider,
  ProviderConfig,
  Rewrite,
  RoleArchetype,
  Suggestion,
  TailoredCV,
  TailorOptions,
} from "./types.js";
