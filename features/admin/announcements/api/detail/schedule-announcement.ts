import { api } from "@/lib/api/client"

export function scheduleAnnouncement(
  id: string,
  scheduledAt: string
): Promise<unknown> {
  return api.post(`/admin/announcements/${id}/schedule`, {
    scheduled_at: scheduledAt,
  })
}
