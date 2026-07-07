import { api } from "@/lib/api/client"
import type { AnnouncementDetail } from "../../types"

export function getAnnouncement(id: string): Promise<AnnouncementDetail> {
  return api.get<AnnouncementDetail>(`/admin/announcements/${id}`)
}
