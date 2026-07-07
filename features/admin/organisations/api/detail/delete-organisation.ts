import { api } from "@/lib/api/client"

export function deleteOrganisation(
  id: string,
  reason: string
): Promise<unknown> {
  return api.delete(`/admin/organisations/${id}`, { reason })
}
