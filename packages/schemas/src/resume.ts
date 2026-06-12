import { z } from "zod";

// Raw input as it arrives from a surface, before extraction.
export const ResumeSourceSchema = z.object({
  content: z.string(),
  format: z.enum(["pdf", "markdown", "plaintext", "html"]),
});
export type ResumeSource = z.infer<typeof ResumeSourceSchema>;

export const ResumeLinkSchema = z.object({
  type: z.enum(["github", "linkedin", "portfolio", "blog", "website", "other"]),
  url: z.string(),
});
export type ResumeLink = z.infer<typeof ResumeLinkSchema>;

export const ResumeContactSchema = z.object({
  email: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
});
export type ResumeContact = z.infer<typeof ResumeContactSchema>;

export const ResumeExperienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  bullets: z.array(z.string()).default([]),
});
export type ResumeExperience = z.infer<typeof ResumeExperienceSchema>;

export const ResumeEducationSchema = z.object({
  institution: z.string(),
  degree: z.string().optional(),
  field: z.string().optional(),
  year: z.string().optional(),
});
export type ResumeEducation = z.infer<typeof ResumeEducationSchema>;

export const ResumeSchema = z.object({
  name: z.string().optional(),
  headline: z.string().optional(),
  summary: z.string().optional(),
  contact: ResumeContactSchema.default({}),
  links: z.array(ResumeLinkSchema).default([]),
  experience: z.array(ResumeExperienceSchema).default([]),
  education: z.array(ResumeEducationSchema).default([]),
  skills: z.array(z.string()).default([]),
  // Original document, kept so downstream steps can quote exact source text.
  rawText: z.string(),
});
export type Resume = z.infer<typeof ResumeSchema>;
