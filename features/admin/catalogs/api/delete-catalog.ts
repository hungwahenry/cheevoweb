import { api } from "@/lib/api/client"

export function deleteCatalog(
  resource: string,
  id: string | number
): Promise<unknown> {
  return api.delete(`/admin/${resource}/${id}`)
}
