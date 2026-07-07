import { api } from "@/lib/api/client"

export function refundOrder(
  id: string,
  amountMinor: number,
  reason: string
): Promise<unknown> {
  return api.post(`/admin/orders/${id}/refund`, {
    amount_minor: amountMinor,
    reason,
  })
}
