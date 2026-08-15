import { api } from "@/lib/api/client"

export interface AdjustBalanceInput {
  direction: "credit" | "debit"
  amount_minor: number
  reason: string
}

export function adjustBalance(
  id: string,
  input: AdjustBalanceInput
): Promise<unknown> {
  return api.post(`/admin/organisations/${id}/balance/adjust`, input)
}
