import { api } from "@/lib/api/client"
import type { OrderView } from "../types"

export function getOrder(token: string): Promise<OrderView> {
  return api.get<OrderView>(`/orders/token/${token}`)
}
