import { api } from "@/lib/api/client"
import type { OrderDetail } from "../../types"

export function getOrder(id: string): Promise<OrderDetail> {
  return api.get<OrderDetail>(`/admin/orders/${id}`)
}
