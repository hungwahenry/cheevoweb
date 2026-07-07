import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { listOrders } from "../api/list-orders"
import type { ListOrdersParams } from "../types"

export function useOrders(params: ListOrdersParams) {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => listOrders(params),
    placeholderData: keepPreviousData,
  })
}
