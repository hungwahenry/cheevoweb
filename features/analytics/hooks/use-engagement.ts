import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getEngagement } from "../api/engagement";

export function useEngagement(days: number) {
  return useQuery({
    queryKey: ["analytics", "engagement", days],
    queryFn: () => getEngagement(days),
    placeholderData: keepPreviousData,
  });
}
