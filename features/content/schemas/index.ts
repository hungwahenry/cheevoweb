import { z } from "zod";

export const pageSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(80)
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and hyphens only"),
  body_html: z.string().min(1, "Body is required").max(200000),
  meta_description: z.string().trim().max(300).optional().or(z.literal("")),
});
export type PageValues = z.infer<typeof pageSchema>;

export const welcomeSchema = z.object({
  headline: z.string().trim().min(1, "Headline is required").max(160),
  subheadline: z.string().trim().min(1, "Subheadline is required").max(280),
});
export type WelcomeValues = z.infer<typeof welcomeSchema>;
