import { api } from "@/lib/api/client"

export function markPastEvent(id: string): Promise<unknown> {
  return api.post(`/admin/events/${id}/mark-past`)
}
