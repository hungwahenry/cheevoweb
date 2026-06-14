import { api } from "@/lib/api/client";

export function cancelOrder(id: string): Promise<unknown> {
  return api.post(`/admin/orders/${id}/cancel`);
}
