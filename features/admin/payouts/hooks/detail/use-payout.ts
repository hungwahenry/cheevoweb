import { useQuery } from "@tanstack/react-query"
import { getPayout } from "../../api/detail/get-payout"

export function usePayout(id: string) {
  return useQuery({
    queryKey: ["payout", id],
    queryFn: () => getPayout(id),
    enabled: Boolean(id),
  })
}
