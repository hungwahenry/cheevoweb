import { useQuery } from "@tanstack/react-query"
import { getHealth } from "../api/get-health"

export function useHealth() {
  return useQuery({
    queryKey: ["ops-health"],
    queryFn: getHealth,
    refetchInterval: 30_000,
  })
}
