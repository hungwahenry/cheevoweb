import { api } from "@/lib/api/client"

export function unsuspendUser(id: string): Promise<unknown> {
  return api.post(`/admin/users/${id}/unsuspend`)
}
