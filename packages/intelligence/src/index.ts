// Rubric v1, role archetypes, and the validator specs the prompts encode.

export {
  ARCHETYPES,
  DEFAULT_ARCHETYPE,
  dataMlEngineer,
  getArchetype,
  listArchetypes,
  productManager,
  softwareEngineer,
} from "./archetypes/index.js";
export { detectArchetype } from "./detect.js";
export {
  RUBRIC,
  RUBRIC_DIMENSIONS,
  RUBRIC_VERSION,
  type RubricDimension,
} from "./rubric.js";

export { ATS_RULES, type AtsCheck, checkAtsCompatibility } from "./validators/ats.js";
export { CLAIM_RULES } from "./validators/claims.js";
