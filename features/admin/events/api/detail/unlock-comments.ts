import { api } from "@/lib/api/client"

export function unlockEventComments(id: string): Promise<unknown> {
  return api.post(`/admin/events/${id}/unlock-comments`)
}
