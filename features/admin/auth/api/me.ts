import { api } from "@/lib/api/client"
import type { AdminUser } from "../types"

export function getMe(): Promise<AdminUser> {
  return api.get<AdminUser>("/auth/me")
}
