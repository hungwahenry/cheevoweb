import { api } from "@/lib/api/client";

export function cancelAnnouncement(id: string): Promise<unknown> {
  return api.post(`/admin/announcements/${id}/cancel`);
}
