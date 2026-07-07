import { useQuery } from "@tanstack/react-query"
import { listPages } from "../api/pages/list-pages"

export function usePages() {
  return useQuery({ queryKey: ["pages"], queryFn: listPages })
}
