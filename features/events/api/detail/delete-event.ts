import { api } from "@/lib/api/client";

export function deleteEvent(id: string, reason: string): Promise<unknown> {
  return api.delete(`/admin/events/${id}`, { reason });
}
