import { api } from "@/lib/api/client"

export function rejectPayout(id: string, note: string): Promise<unknown> {
  return api.post(`/admin/payouts/${id}/reject`, { note })
}
