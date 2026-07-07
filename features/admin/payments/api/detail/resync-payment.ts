import { api } from "@/lib/api/client";

export function resyncPayment(id: string): Promise<unknown> {
  return api.post(`/admin/payments/${id}/resync`);
}
