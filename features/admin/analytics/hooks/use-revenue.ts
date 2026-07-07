import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getRevenue } from "../api/revenue"
import type { AnalyticsInterval } from "../types"

export function useRevenue(interval: AnalyticsInterval, days: number) {
  return useQuery({
    queryKey: ["analytics", "revenue", interval, days],
    queryFn: () => getRevenue(interval, days),
    placeholderData: keepPreviousData,
  })
}
