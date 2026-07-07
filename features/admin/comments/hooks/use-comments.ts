import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { listComments } from "../api/list-comments"
import type { ListCommentsParams } from "../types"

export function useComments(params: ListCommentsParams) {
  return useQuery({
    queryKey: ["comments", params],
    queryFn: () => listComments(params),
    placeholderData: keepPreviousData,
  })
}
