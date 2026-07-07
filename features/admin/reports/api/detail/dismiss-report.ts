import { api } from "@/lib/api/client"

export function dismissReport(id: string, note: string): Promise<unknown> {
  return api.post(`/admin/reports/${id}/dismiss`, { note })
}
