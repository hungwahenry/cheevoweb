import { z } from "zod"

export const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(255)
    .pipe(z.email("Enter a valid email address")),
})

export type EmailValues = z.infer<typeof emailSchema>

export const otpSchema = z.object({
  code: z.string().length(6, "Enter the 6-digit code"),
})

export type OtpValues = z.infer<typeof otpSchema>
