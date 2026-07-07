import { useQuery } from "@tanstack/react-query"
import { getSegmentOptions } from "../api/segment-options"

export function useSegmentOptions() {
  return useQuery({
    queryKey: ["segment-options"],
    queryFn: getSegmentOptions,
    staleTime: 5 * 60_000,
  })
}
