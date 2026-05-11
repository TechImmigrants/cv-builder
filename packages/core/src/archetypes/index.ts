import type { RoleArchetype, CVInput } from "../types.js";

/**
 * Registry of role archetypes. Each archetype defines:
 * - Keywords to look for in the CV
 * - Evaluation weight distribution
 * - Domain-specific action verbs
 * - Anti-patterns specific to that role type
 *
 * Contributors: Add new archetypes by creating a file in this directory
 * and registering it in the ARCHETYPES map below.
 */

const ARCHETYPES: Map<string, RoleArchetype> = new Map();

// --- Default Archetypes ---

ARCHETYPES.set("ai-product-manager", {
  id: "ai-product-manager",
  name: "AI Product Manager",
  description: "Product managers building LLM-powered features and AI products",
  keywords: [
    "llm", "gpt", "claude", "gemini", "rag", "embeddings", "vector",
    "fine-tuning", "prompt engineering", "a/b testing", "product-market fit",
    "user research", "roadmap", "okrs", "kpis", "retention", "activation",
    "funnel", "agile", "sprint", "jira", "linear", "amplitude", "mixpanel",
    "hypothesis", "experiment", "hallucination", "evaluation", "guardrails",
  ],
  evaluationWeights: {
    shippedEvidence: 0.30,
    quantifiedImpact: 0.20,
    toolingVisibility: 0.15,
    atsCompatibility: 0.15,
    keywordMatch: 0.10,
    publicProof: 0.10,
  },
  actionVerbs: [
    "Shipped", "Owned", "Led", "Drove", "Defined", "Prioritized",
    "Launched", "Measured", "Grew", "Reduced", "Coordinated",
  ],
  antiPatterns: [
    "passionate about AI",
    "leveraged synergies",
    "defined product vision",
    "aligned stakeholders",
  ],
});

ARCHETYPES.set("ai-engineer", {
  id: "ai-engineer",
  name: "AI Engineer",
  description: "Engineers building production AI systems (RAG, agents, LLM apps)",
  keywords: [
    "python", "typescript", "pytorch", "tensorflow", "langchain", "langgraph",
    "llamaindex", "rag", "vector database", "pinecone", "weaviate", "pgvector",
    "embeddings", "fine-tuning", "rlhf", "vllm", "ray", "kubernetes", "docker",
    "aws bedrock", "azure ai", "gcp vertex", "openai", "anthropic", "llama",
    "mistral", "prompt engineering", "function calling", "tool use", "agents",
    "evaluation", "deepeval", "langsmith", "mlops", "ci/cd", "fastapi",
  ],
  evaluationWeights: {
    shippedEvidence: 0.30,
    quantifiedImpact: 0.15,
    toolingVisibility: 0.25,
    atsCompatibility: 0.10,
    keywordMatch: 0.10,
    publicProof: 0.10,
  },
  actionVerbs: [
    "Built", "Architected", "Deployed", "Optimized", "Reduced",
    "Migrated", "Implemented", "Scaled", "Automated", "Designed",
  ],
  antiPatterns: [
    "familiar with machine learning",
    "passionate about AI",
    "experience with various tools",
    "strong problem-solving skills",
  ],
});

ARCHETYPES.set("backend-engineer", {
  id: "backend-engineer",
  name: "Backend Engineer",
  description: "Server-side engineers building APIs, services, and infrastructure",
  keywords: [
    "api", "rest", "graphql", "grpc", "microservices", "distributed systems",
    "postgresql", "mysql", "mongodb", "redis", "kafka", "rabbitmq",
    "kubernetes", "docker", "aws", "gcp", "azure", "terraform",
    "ci/cd", "github actions", "node.js", "python", "go", "java", "rust",
    "typescript", "testing", "monitoring", "observability", "datadog",
  ],
  evaluationWeights: {
    shippedEvidence: 0.25,
    quantifiedImpact: 0.20,
    toolingVisibility: 0.20,
    atsCompatibility: 0.15,
    keywordMatch: 0.10,
    publicProof: 0.10,
  },
  actionVerbs: [
    "Built", "Architected", "Scaled", "Optimized", "Migrated",
    "Designed", "Deployed", "Reduced", "Automated", "Implemented",
  ],
  antiPatterns: [
    "team player",
    "fast learner",
    "various technologies",
    "responsible for",
  ],
});

ARCHETYPES.set("frontend-engineer", {
  id: "frontend-engineer",
  name: "Frontend Engineer",
  description: "Engineers building web UIs, design systems, and user experiences",
  keywords: [
    "react", "next.js", "vue", "svelte", "typescript", "javascript",
    "css", "tailwind", "html", "accessibility", "a11y", "wcag",
    "performance", "core web vitals", "webpack", "vite", "testing",
    "jest", "playwright", "cypress", "storybook", "design system",
    "responsive", "mobile", "pwa", "ssr", "ssg", "graphql", "rest",
  ],
  evaluationWeights: {
    shippedEvidence: 0.25,
    quantifiedImpact: 0.20,
    toolingVisibility: 0.20,
    atsCompatibility: 0.15,
    keywordMatch: 0.10,
    publicProof: 0.10,
  },
  actionVerbs: [
    "Built", "Shipped", "Designed", "Implemented", "Optimized",
    "Reduced", "Created", "Migrated", "Led", "Improved",
  ],
  antiPatterns: [
    "pixel-perfect",
    "passionate about UI",
    "various frameworks",
    "responsible for frontend",
  ],
});

ARCHETYPES.set("devops-sre", {
  id: "devops-sre",
  name: "DevOps / SRE",
  description: "Site reliability engineers and DevOps specialists",
  keywords: [
    "kubernetes", "docker", "terraform", "ansible", "aws", "gcp", "azure",
    "ci/cd", "github actions", "gitlab ci", "jenkins", "argocd",
    "prometheus", "grafana", "datadog", "elk", "observability",
    "incident management", "sla", "slo", "sli", "linux", "networking",
    "security", "iam", "vault", "helm", "istio", "service mesh",
  ],
  evaluationWeights: {
    shippedEvidence: 0.20,
    quantifiedImpact: 0.25,
    toolingVisibility: 0.25,
    atsCompatibility: 0.10,
    keywordMatch: 0.10,
    publicProof: 0.10,
  },
  actionVerbs: [
    "Automated", "Reduced", "Scaled", "Built", "Migrated",
    "Improved", "Designed", "Implemented", "Monitored", "Secured",
  ],
  antiPatterns: [
    "managed servers",
    "responsible for infrastructure",
    "various cloud platforms",
    "ensured uptime",
  ],
});

ARCHETYPES.set("data-engineer", {
  id: "data-engineer",
  name: "Data Engineer",
  description: "Engineers building data pipelines, warehouses, and analytics platforms",
  keywords: [
    "python", "sql", "spark", "airflow", "dagster", "dbt",
    "snowflake", "bigquery", "redshift", "databricks", "delta lake",
    "kafka", "flink", "etl", "elt", "data modeling", "dimensional",
    "data warehouse", "data lake", "lakehouse", "parquet", "iceberg",
    "aws", "gcp", "azure", "terraform", "docker", "kubernetes",
  ],
  evaluationWeights: {
    shippedEvidence: 0.25,
    quantifiedImpact: 0.25,
    toolingVisibility: 0.20,
    atsCompatibility: 0.10,
    keywordMatch: 0.10,
    publicProof: 0.10,
  },
  actionVerbs: [
    "Built", "Designed", "Optimized", "Migrated", "Automated",
    "Reduced", "Scaled", "Implemented", "Modeled", "Orchestrated",
  ],
  antiPatterns: [
    "worked with data",
    "responsible for pipelines",
    "various data tools",
    "big data experience",
  ],
});

// --- Registry API ---

export function getArchetype(id: string): RoleArchetype {
  const archetype = ARCHETYPES.get(id);
  if (!archetype) {
    throw new Error(
      `Unknown archetype: "${id}". Available: ${[...ARCHETYPES.keys()].join(", ")}`
    );
  }
  return archetype;
}

export function listArchetypes(): RoleArchetype[] {
  return [...ARCHETYPES.values()];
}

export function registerArchetype(archetype: RoleArchetype): void {
  ARCHETYPES.set(archetype.id, archetype);
}

/**
 * Auto-detect the best archetype based on CV content and optional JD.
 * Uses keyword frequency matching to determine the closest fit.
 */
export function detectArchetype(
  cvContent: string,
  jdContent?: string
): RoleArchetype {
  const text = `${cvContent} ${jdContent || ""}`.toLowerCase();

  let bestMatch: RoleArchetype | null = null;
  let bestScore = 0;

  for (const archetype of ARCHETYPES.values()) {
    const matchCount = archetype.keywords.filter((kw) =>
      text.includes(kw.toLowerCase())
    ).length;
    const score = matchCount / archetype.keywords.length;

    if (score > bestScore) {
      bestScore = score;
      bestMatch = archetype;
    }
  }

  return bestMatch || getArchetype("backend-engineer");
}
