import { api } from "@/lib/api/client"
import type { OrderView } from "../types"

export function verifyOrder(token: string): Promise<OrderView> {
  return api.post<OrderView>(`/orders/token/${token}/verify`)
}
