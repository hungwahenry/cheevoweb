import { api } from "@/lib/api/client"

export function markPaymentSuccess(id: string): Promise<unknown> {
  return api.post(`/admin/payments/${id}/mark-success`)
}
