import type { Archetype } from "@cv-builder/schemas";
import { dataMlEngineer } from "./data-ml-engineer.js";
import { productManager } from "./product-manager.js";
import { softwareEngineer } from "./software-engineer.js";

// Register new archetypes here. Software Engineer is the fallback when nothing
// else clearly matches.
export const ARCHETYPES: Archetype[] = [
  softwareEngineer,
  productManager,
  dataMlEngineer,
];

export const DEFAULT_ARCHETYPE = softwareEngineer;

export function getArchetype(id: string): Archetype | undefined {
  return ARCHETYPES.find((a) => a.id === id);
}

export function listArchetypes(): Archetype[] {
  return ARCHETYPES;
}

export { softwareEngineer, productManager, dataMlEngineer };
