import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { listEvents } from "../api/list-events"
import type { ListEventsParams } from "../types"

export function useEvents(params: ListEventsParams) {
  return useQuery({
    queryKey: ["events", params],
    queryFn: () => listEvents(params),
    placeholderData: keepPreviousData,
  })
}
