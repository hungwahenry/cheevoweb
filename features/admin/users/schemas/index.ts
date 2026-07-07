import { z } from "zod"

export const suspendUserSchema = z.object({
  reason: z.string().trim().min(1, "A reason is required").max(1000),
})

export type SuspendUserValues = z.infer<typeof suspendUserSchema>
