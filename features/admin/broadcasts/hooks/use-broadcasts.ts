import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { listBroadcasts } from "../api/list-broadcasts"
import type { ListBroadcastsParams } from "../types"

export function useBroadcasts(params: ListBroadcastsParams) {
  return useQuery({
    queryKey: ["broadcasts", params],
    queryFn: () => listBroadcasts(params),
    placeholderData: keepPreviousData,
  })
}
