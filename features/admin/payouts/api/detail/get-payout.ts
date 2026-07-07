import { api } from "@/lib/api/client"
import type { Payout } from "../../types"

export function getPayout(id: string): Promise<Payout> {
  return api.get<Payout>(`/admin/payouts/${id}`)
}
