import { useQuery } from "@tanstack/react-query"
import { getEvent } from "../../api/detail/get-event"

export function useEvent(id: string) {
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => getEvent(id),
    enabled: Boolean(id),
  })
}
