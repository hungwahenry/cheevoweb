import { api } from "@/lib/api/client"

export function cancelBroadcast(id: string): Promise<unknown> {
  return api.post(`/admin/broadcasts/${id}/cancel`)
}
