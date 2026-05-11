export { evaluate } from "./evaluator/index.js";
export { tailor, suggest } from "./builder/index.js";
export {
  getArchetype,
  listArchetypes,
  registerArchetype,
  detectArchetype,
} from "./archetypes/index.js";
export { UNIVERSAL_RULES } from "./rules/index.js";
export type {
  EvaluationResult,
  EvaluationDimension,
  TailoredCV,
  CVChange,
  Suggestion,
  Issue,
  Rewrite,
  RoleArchetype,
  EvaluationWeights,
  CVInput,
  JobDescription,
  EvaluateOptions,
  TailorOptions,
  LLMProvider,
  ProviderConfig,
} from "./types.js";
