import { useQuery } from "@tanstack/react-query"
import { listCatalog } from "../api/list-catalog"

export function useCatalog<T>(resource: string) {
  return useQuery({
    queryKey: ["catalog", resource],
    queryFn: () => listCatalog<T>(resource),
  })
}
