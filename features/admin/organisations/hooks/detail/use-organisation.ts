import { useQuery } from "@tanstack/react-query"
import { getOrganisation } from "../../api/detail/get-organisation"

export function useOrganisation(id: string) {
  return useQuery({
    queryKey: ["organisation", id],
    queryFn: () => getOrganisation(id),
    enabled: Boolean(id),
  })
}
