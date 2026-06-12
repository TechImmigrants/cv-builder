// Rules the score prompt and the deterministic check below both follow.
export const ATS_RULES = [
  { id: "single-column", label: "Single-column layout, no side-by-side text" },
  { id: "standard-headings", label: "Standard section headings" },
  { id: "no-tables", label: "No tables or text laid out in columns" },
  { id: "no-graphics", label: "No images, icons, or text inside graphics" },
  { id: "contact-parseable", label: "Email and basic contact info in plain text" },
] as const;

const STANDARD_HEADINGS = [
  "experience",
  "work experience",
  "employment",
  "education",
  "skills",
  "projects",
  "summary",
  "certifications",
];

export interface AtsCheck {
  compatible: boolean;
  findings: string[];
}

// Catches the obvious, deterministic ATS problems from raw text. Subtler layout
// issues are left to the score prompt.
export function checkAtsCompatibility(resumeText: string): AtsCheck {
  const findings: string[] = [];
  const text = resumeText.toLowerCase();

  if (/\|.*\|/.test(resumeText) || /\t.*\t/.test(resumeText)) {
    findings.push("Looks like a table or columns — flatten to single-column text.");
  }
  if (/!\[[^\]]*\]\([^)]+\)/.test(resumeText) || /<img\b/i.test(resumeText)) {
    findings.push("Contains images, ATS parsers can't read text inside graphics.");
  }
  if (!/[\w.+-]+@[\w-]+\.[\w.-]+/.test(resumeText)) {
    findings.push("No plain-text email found.");
  }
  if (!STANDARD_HEADINGS.some((h) => text.includes(h))) {
    findings.push("No standard section headings detected.");
  }

  return { compatible: findings.length === 0, findings };
}
