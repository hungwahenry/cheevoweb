import { api } from "@/lib/api/client";

export function markPayoutPaid(id: string, note: string): Promise<unknown> {
  return api.post(`/admin/payouts/${id}/mark-paid`, { note });
}
