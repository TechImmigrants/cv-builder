// Rubric v1, role archetypes, and the validator specs the prompts encode.

export { RUBRIC, RUBRIC_VERSION, RUBRIC_DIMENSIONS, type RubricDimension } from "./rubric.js";

export {
  ARCHETYPES,
  DEFAULT_ARCHETYPE,
  getArchetype,
  listArchetypes,
  softwareEngineer,
  productManager,
  dataMlEngineer,
} from "./archetypes/index.js";

export { detectArchetype } from "./detect.js";

export { ATS_RULES, checkAtsCompatibility, type AtsCheck } from "./validators/ats.js";
export { CLAIM_RULES } from "./validators/claims.js";
