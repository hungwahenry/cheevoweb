import { api } from "@/lib/api/client"

export function unsuspendOrganisation(id: string): Promise<unknown> {
  return api.post(`/admin/organisations/${id}/unsuspend`)
}
