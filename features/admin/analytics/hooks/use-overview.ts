import { useQuery } from "@tanstack/react-query"
import { getOverview } from "../api/overview"

export function useOverview() {
  return useQuery({ queryKey: ["analytics", "overview"], queryFn: getOverview })
}
