import { api } from "@/lib/api/client"
import type { Paginated } from "@/lib/api/types"
import type { ListUsersParams, UserRow } from "../types"

export function listUsers(
  params: ListUsersParams
): Promise<Paginated<UserRow>> {
  return api.get<Paginated<UserRow>>("/admin/users", {
    page: params.page,
    per_page: params.per_page,
    q: params.q,
    suspended: params.suspended,
    role: params.role,
  })
}
