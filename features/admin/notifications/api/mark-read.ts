import { api } from "@/lib/api/client"

export function markRead(id: string): Promise<unknown> {
  return api.patch(`/notifications/${id}/read`)
}

export function markAllRead(): Promise<unknown> {
  return api.patch("/notifications/read-all?audience=admin")
}
