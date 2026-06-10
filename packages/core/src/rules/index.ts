/**
 * Universal rules that apply regardless of role archetype.
 * Based on 2026 hiring research from FAANG recruiters, AI hiring managers,
 * and opinion leaders.
 *
 * Contributors: Add new rules by extending the arrays below.
 * Each rule should include a source reference where possible.
 */

export interface AntiPattern {
  name: string;
  match: string;
  why: string;
  fix: string;
  severity: "critical" | "major" | "minor";
}

export interface PositivePattern {
  name: string;
  match: string;
  description: string;
}

export const UNIVERSAL_RULES = {
  antiPatterns: [
    {
      name: "Generic AI enthusiasm",
      match: "passionate about (AI|artificial intelligence|machine learning)",
      why: "Every candidate says this. Zero differentiation signal.",
      fix: "Replace with a specific project: 'Built a RAG pipeline serving 10K queries/day'",
      severity: "major",
    },
    {
      name: "Buzzword soup",
      match: "leveraged? (synerg|innovative solutions|cutting-edge)",
      why: "Hiring managers trained to skip these. Reads as AI-generated filler.",
      fix: "Name the specific tool and outcome: 'Used LangChain to reduce latency by 40%'",
      severity: "major",
    },
    {
      name: "Responsibility without ownership",
      match: "responsible for",
      why: "Shows presence, not impact. Anyone can be 'responsible for' something.",
      fix: "Replace with action + outcome: 'Owned the auth migration, cutting login failures by 60%'",
      severity: "major",
    },
    {
      name: "Proven track record cliché",
      match: "proven track record",
      why: "Empty claim without evidence. ATS tools increasingly penalize this.",
      fix: "Show the track record: '3 products shipped, 2 from 0→1, combined 50K MAU'",
      severity: "minor",
    },
    {
      name: "Results-oriented filler",
      match: "results[- ]oriented",
      why: "Self-description that adds nothing. Show results instead of claiming them.",
      fix: "Delete entirely. Let your bullet points demonstrate results.",
      severity: "minor",
    },
    {
      name: "Spearheaded",
      match: "spearheaded",
      why: "Overused action verb that has lost all meaning.",
      fix: "Use 'led', 'ran', or 'drove' with a specific outcome.",
      severity: "minor",
    },
    {
      name: "Fast-paced world",
      match: "in today'?s fast[- ]paced",
      why: "Filler phrase that every AI writing tool produces. Signals lazy writing.",
      fix: "Delete the entire sentence. Start with what you actually did.",
      severity: "minor",
    },
    {
      name: "Team player claim",
      match: "team player",
      why: "Expected of everyone. Claiming it signals you have nothing better to say.",
      fix: "Show collaboration: 'Coordinated across 4 teams to ship the payments rewrite in 8 weeks'",
      severity: "minor",
    },
    {
      name: "Various/multiple vague references",
      match: "(various|multiple|several) (tools|technologies|platforms|frameworks)",
      why: "Vagueness suggests shallow experience. Name the tools or don't mention them.",
      fix: "Be specific: 'Python, TypeScript, Go' or 'AWS, GCP' — name exactly what you used.",
      severity: "major",
    },
    {
      name: "Strong/excellent skills claim",
      match: "(strong|excellent|exceptional) (communication|problem[- ]solving|leadership) skills",
      why: "Self-assessed soft skills are ignored by screeners. Actions prove skills.",
      fix: "Replace with evidence: 'Mentored 3 junior engineers to promotion' or 'Presented quarterly results to 200-person all-hands'",
      severity: "minor",
    },
    {
      name: "Outdated tool without modern stack",
      match: "\\b(jQuery(?!.*\\b(React|Vue|Angular|Svelte)\\b)|AngularJS|PHP 5(?:\\.\\d+)?|Python 2(?:\\.\\d+)?|SVN(?!.*\\bGit\\b)|CoffeeScript|Backbone\\.js|(?:Grunt|Gulp)(?!.*\\b(Webpack|Vite|Rollup|Parcel|esbuild)\\b))\\b",
      why: "Listing deprecated or legacy technologies without modern frameworks makes your resume look stale and lack growth.",
      fix: "Replace with modern alternatives or remove the outdated technology.",
      severity: "major",
    },
    {
      name: "Outdated tool with modern stack",
       match:
      "\\b(jQuery|AngularJS|PHP 5(?:\\.\\d+)?|Python 2(?:\\.\\d+)?|SVN|CoffeeScript|Backbone\\.js|Grunt|Gulp)\\b.*\\b(React|Vue|Angular|Svelte|Git|Webpack|Vite|Rollup|Parcel|esbuild)\\b|\\b(React|Vue|Angular|Svelte|Git|Webpack|Vite|Rollup|Parcel|esbuild)\\b.*\\b(jQuery|AngularJS|PHP 5(?:\\.\\d+)?|Python 2(?:\\.\\d+)?|SVN|Heroku|CoffeeScript|Backbone\\.js|Grunt|Gulp)\\b",
      why: "Listing outdated technologies alongside modern frameworks can be confusing and may not accurately represent your skills.",
      fix: "Remove outdated technologies to show focus on modern skills.",
      severity: "minor",
    },
    {
      name: "Heroku deployment timeline (old experience)",
      match:
        "\\b(Heroku)\\b[\\s\\S]*\\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\\s+(?:201\\d|202[0-4])\\b|\\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\\s+(?:201\\d|202[0-4])\\b[\\s\\S]*\\b(Heroku)\\b|\\b(Heroku)\\b[\\s\\S]*\\b20(?:1\\d|202[0-4])\\b|\\b20(?:1\\d|202[0-4])\\b[\\s\\S]*\\b(Heroku)\\b",
      why: "Heroku is only appropriate for older work, and older dates should be clearly shown.",
      fix: "Heroku can be kept for legacy experience, but post 2024, it should be replaced with a modern deployment platform.",
      severity: "minor",
    },
    {
      name: "Heroku deployment timeline post 2024",
      match:
        "^(?![\\s\\S]*\\bHeroku\\b[\\s\\S]*\\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\\s+(?:201\\d|202[0-4])\\b)(?![\\s\\S]*\\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\\s+(?:201\\d|202[0-4])\\b[\\s\\S]*\\bHeroku\\b)[\\s\\S]*\\bHeroku\\b",
      why: "Heroku as primary deployment is outdated for modern resumes unless the experience is clearly dated before 2024.",
      fix: "Remove/replace Heroku with a current deployment platform.",
      severity: "major",
    },
  ] satisfies AntiPattern[],

  positivePatterns: [
    {
      name: "Quantified outcome",
      match: "\\d+[%xX]|\\$[\\d,]+|\\d+\\+?\\s*(users|customers|teams)",
      description: "Contains specific numbers that demonstrate scale and impact",
    },
    {
      name: "Cause-and-effect bullet",
      match: "(built|shipped|deployed|implemented).*→.*\\d",
      description: "Shows action leading to measurable result",
    },
    {
      name: "Named tools",
      match: "(React|Python|Kubernetes|AWS|LangChain|PostgreSQL|Docker)",
      description: "Specific technology names that ATS can match to requirements",
    },
    {
      name: "Public proof link",
      match: "https?://",
      description: "Links to public work (GitHub, blog, portfolio) that can be verified",
    },
    {
      name: "Production scale indicator",
      match: "(production|live|serving|deployed to).*\\d",
      description: "Shows the work is real and running at scale, not a toy project",
    },
  ] satisfies PositivePattern[],

  atsRules: {
    requiredSections: ["experience", "skills", "education"],
    forbiddenFormats: ["tables in experience", "multi-column layout", "text boxes"],
    dateFormat: /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}\b/,
    maxBulletsPerRole: 6,
    minBulletsPerRole: 3,
  },
};
