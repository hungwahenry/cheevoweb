import { api } from "@/lib/api/client";

export function lockEventComments(id: string): Promise<unknown> {
  return api.post(`/admin/events/${id}/lock-comments`);
}
