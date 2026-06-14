import { api } from "@/lib/api/client";

export function suspendUser(id: string, reason: string): Promise<unknown> {
  return api.post(`/admin/users/${id}/suspend`, { reason });
}
