import { api } from "@/lib/api/client"

export function deletePage(id: string): Promise<unknown> {
  return api.delete(`/admin/pages/${id}`)
}
