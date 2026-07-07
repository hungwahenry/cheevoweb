import { api } from "@/lib/api/client"
import type { Paginated } from "@/lib/api/types"
import type { ListOrdersParams, OrderRow } from "../types"

export function listOrders(
  params: ListOrdersParams
): Promise<Paginated<OrderRow>> {
  return api.get<Paginated<OrderRow>>("/admin/orders", {
    page: params.page,
    per_page: params.per_page,
    status: params.status,
    event_id: params.event_id,
  })
}
