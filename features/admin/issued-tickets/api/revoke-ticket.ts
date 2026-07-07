import { api } from "@/lib/api/client"

export function revokeTicket(id: string): Promise<unknown> {
  return api.post(`/admin/issued-tickets/${id}/revoke`)
}
