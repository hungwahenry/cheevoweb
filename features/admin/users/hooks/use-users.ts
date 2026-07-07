import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { listUsers } from "../api/list-users"
import type { ListUsersParams } from "../types"

export function useUsers(params: ListUsersParams) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => listUsers(params),
    placeholderData: keepPreviousData,
  })
}
