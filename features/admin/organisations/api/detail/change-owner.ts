import { api } from "@/lib/api/client"

export function changeOwner(
  id: string,
  userId: string,
  reason?: string
): Promise<unknown> {
  return api.post(`/admin/organisations/${id}/change-owner`, {
    user_id: userId,
    reason,
  })
}
