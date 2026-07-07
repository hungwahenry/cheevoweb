import { api } from "@/lib/api/client"

export function revokeSessions(id: string): Promise<{ revoked: number }> {
  return api.post<{ revoked: number }>(`/admin/users/${id}/revoke-sessions`)
}
