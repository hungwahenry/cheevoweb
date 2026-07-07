import { api } from "@/lib/api/client"
import type { OrganisationDetail } from "../../types"

export function getOrganisation(id: string): Promise<OrganisationDetail> {
  return api.get<OrganisationDetail>(`/admin/organisations/${id}`)
}
