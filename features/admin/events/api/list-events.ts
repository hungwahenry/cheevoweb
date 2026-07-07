import { api } from "@/lib/api/client"
import type { Paginated } from "@/lib/api/types"
import type { EventRow, ListEventsParams } from "../types"

export function listEvents(
  params: ListEventsParams
): Promise<Paginated<EventRow>> {
  return api.get<Paginated<EventRow>>("/admin/events", {
    page: params.page,
    per_page: params.per_page,
    q: params.q,
    status: params.status,
  })
}
