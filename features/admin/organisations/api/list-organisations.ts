import { api } from "@/lib/api/client"
import type { Paginated } from "@/lib/api/types"
import type { ListOrgsParams, OrganisationRow } from "../types"

export function listOrganisations(
  params: ListOrgsParams
): Promise<Paginated<OrganisationRow>> {
  return api.get<Paginated<OrganisationRow>>("/admin/organisations", {
    page: params.page,
    per_page: params.per_page,
    q: params.q,
    suspended: params.suspended,
  })
}
