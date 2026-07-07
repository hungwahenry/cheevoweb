import { api } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";
import type { AnnouncementRow, ListAnnouncementsParams } from "../types";

export function listAnnouncements(
  params: ListAnnouncementsParams,
): Promise<Paginated<AnnouncementRow>> {
  return api.get<Paginated<AnnouncementRow>>("/admin/announcements", {
    page: params.page,
    per_page: params.per_page,
    kind: params.kind,
    status: params.status,
  });
}
