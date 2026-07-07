import { z } from "zod";

const slug = z
  .string()
  .trim()
  .min(1, "Slug is required")
  .max(64)
  .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and hyphens only");

export const simpleCatalogSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  slug,
  sort_order: z.number().int().min(0),
  is_active: z.boolean(),
  base_url: z
    .union([z.literal(""), z.url("Enter a valid URL").max(200)])
    .optional(),
});

export type SimpleCatalogValues = z.infer<typeof simpleCatalogSchema>;

export const reportReasonSchema = z.object({
  label: z.string().trim().min(1, "Label is required").max(120),
  slug,
  description: z.string().trim().max(1000).optional().or(z.literal("")),
  scope_types: z
    .array(z.enum(["event", "comment", "user", "organisation"]))
    .max(8),
  requires_details: z.boolean(),
  display_order: z.number().int().min(0),
  is_active: z.boolean(),
});

export type ReportReasonValues = z.infer<typeof reportReasonSchema>;
