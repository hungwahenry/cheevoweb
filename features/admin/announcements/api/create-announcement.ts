import { api } from "@/lib/api/client"
import type { AnnouncementDetail, BroadcastInput } from "../types"

export function createAnnouncement(
  input: BroadcastInput
): Promise<AnnouncementDetail> {
  return api.post<AnnouncementDetail>("/admin/announcements", input)
}
