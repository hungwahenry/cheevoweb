import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { listSuppressions } from "../../api/suppressions/list-suppressions"
import type { ListSuppressionsParams } from "../../types"

export function useSuppressions(params: ListSuppressionsParams) {
  return useQuery({
    queryKey: ["suppressions", params],
    queryFn: () => listSuppressions(params),
    placeholderData: keepPreviousData,
  })
}
