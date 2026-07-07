import { api } from "@/lib/api/client";

export function unpublishEvent(id: string): Promise<unknown> {
  return api.post(`/admin/events/${id}/unpublish`);
}
