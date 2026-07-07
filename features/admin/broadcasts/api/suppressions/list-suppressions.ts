import { api } from "@/lib/api/client"
import type { Paginated } from "@/lib/api/types"
import type { ListSuppressionsParams, Suppression } from "../../types"

export function listSuppressions(
  params: ListSuppressionsParams
): Promise<Paginated<Suppression>> {
  return api.get<Paginated<Suppression>>("/admin/broadcast-suppressions", {
    page: params.page,
    per_page: params.per_page,
    q: params.q,
    reason: params.reason,
  })
}
