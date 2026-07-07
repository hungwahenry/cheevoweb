import { api } from "@/lib/api/client"

export function deleteSuppression(id: string): Promise<unknown> {
  return api.delete(`/admin/broadcast-suppressions/${id}`)
}
