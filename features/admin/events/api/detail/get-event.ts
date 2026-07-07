import { api } from "@/lib/api/client"
import type { EventDetail } from "../../types"

export function getEvent(id: string): Promise<EventDetail> {
  return api.get<EventDetail>(`/admin/events/${id}`)
}
