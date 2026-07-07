import { api } from "@/lib/api/client"
import type { Paginated } from "@/lib/api/types"
import type { BroadcastRow, ListBroadcastsParams } from "../types"

export function listBroadcasts(
  params: ListBroadcastsParams
): Promise<Paginated<BroadcastRow>> {
  return api.get<Paginated<BroadcastRow>>("/admin/broadcasts", {
    page: params.page,
    per_page: params.per_page,
    status: params.status,
  })
}
