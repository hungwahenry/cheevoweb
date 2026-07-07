import { api } from "@/lib/api/client"

export function retryPayout(id: string): Promise<unknown> {
  return api.post(`/admin/payouts/${id}/retry`)
}
