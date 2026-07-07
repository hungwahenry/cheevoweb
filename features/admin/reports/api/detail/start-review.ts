import { api } from "@/lib/api/client"

export function startReview(id: string): Promise<unknown> {
  return api.post(`/admin/reports/${id}/start-review`)
}
