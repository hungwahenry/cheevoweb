import { api } from "@/lib/api/client"

export function settlePayout(id: string, notes: string): Promise<unknown> {
  return api.post(`/admin/payouts/${id}/settle`, { notes })
}
