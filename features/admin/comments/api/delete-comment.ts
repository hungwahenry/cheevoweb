import { api } from "@/lib/api/client"

export function deleteComment(id: string, reason: string): Promise<unknown> {
  return api.delete(`/admin/comments/${id}`, { reason })
}
