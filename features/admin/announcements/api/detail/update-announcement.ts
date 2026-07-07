import { api } from "@/lib/api/client"
import type { AnnouncementDetail, BroadcastInput } from "../../types"

export function updateAnnouncement(
  id: string,
  input: BroadcastInput
): Promise<AnnouncementDetail> {
  return api.patch<AnnouncementDetail>(`/admin/announcements/${id}`, input)
}
