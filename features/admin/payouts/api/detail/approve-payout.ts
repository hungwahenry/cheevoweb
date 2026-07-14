import { api } from "@/lib/api/client"

export function approvePayout(id: string): Promise<unknown> {
  return api.post(`/admin/payouts/${id}/approve`)
}
