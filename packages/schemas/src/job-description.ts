import { z } from "zod";

// Phase 1 uses the JD only as keyword-match context; fit-scoring is Phase 2.
export const JobDescriptionSchema = z.object({
  content: z.string(),
  url: z.string().optional(),
  company: z.string().optional(),
  title: z.string().optional(),
  keywords: z.array(z.string()).default([]),
});
export type JobDescription = z.infer<typeof JobDescriptionSchema>;
