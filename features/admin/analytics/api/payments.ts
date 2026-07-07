import { api } from "@/lib/api/client"
import type { PaymentsBreakdown } from "../types"

export function getPayments(days: number): Promise<PaymentsBreakdown> {
  return api.get<PaymentsBreakdown>("/admin/analytics/payments", { days })
}
