import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getLeaderboards } from "../api/leaderboards"

export function useLeaderboards(days: number, limit = 5) {
  return useQuery({
    queryKey: ["analytics", "leaderboards", days, limit],
    queryFn: () => getLeaderboards(days, limit),
    placeholderData: keepPreviousData,
  })
}
