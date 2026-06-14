import { api } from "@/lib/api/client";

export function transferTicket(
  id: string,
  toUserId: string,
  reason?: string,
): Promise<unknown> {
  return api.post(`/admin/issued-tickets/${id}/transfer`, {
    to_user_id: toUserId,
    reason,
  });
}
