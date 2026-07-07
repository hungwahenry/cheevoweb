import { api } from "@/lib/api/client"

export function deleteAnnouncement(id: string): Promise<unknown> {
  return api.delete(`/admin/announcements/${id}`)
}
