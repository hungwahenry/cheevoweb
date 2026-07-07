import { api } from "@/lib/api/client"
import type { PaymentDetail } from "../../types"

export function getPayment(id: string): Promise<PaymentDetail> {
  return api.get<PaymentDetail>(`/admin/payments/${id}`)
}
