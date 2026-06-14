import { api } from "@/lib/api/client";

export function markOrderPaid(id: string): Promise<unknown> {
  return api.post(`/admin/orders/${id}/mark-paid`);
}
