import { api } from "@/lib/api/client"

export function rejectPayout(id: string, notes?: string): Promise<unknown> {
  return api.post(`/admin/payouts/${id}/reject`, notes ? { notes } : {})
}
