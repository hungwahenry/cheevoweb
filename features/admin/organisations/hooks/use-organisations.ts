import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { listOrganisations } from "../api/list-organisations"
import type { ListOrgsParams } from "../types"

export function useOrganisations(params: ListOrgsParams) {
  return useQuery({
    queryKey: ["organisations", params],
    queryFn: () => listOrganisations(params),
    placeholderData: keepPreviousData,
  })
}
