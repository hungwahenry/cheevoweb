import { api } from "@/lib/api/client"

export function reissueTicket(id: string): Promise<unknown> {
  return api.post(`/admin/issued-tickets/${id}/reissue`)
}
