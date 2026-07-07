import { api } from "@/lib/api/client"

export function sendAnnouncement(id: string): Promise<unknown> {
  return api.post(`/admin/announcements/${id}/send`)
}
