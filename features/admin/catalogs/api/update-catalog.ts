import { api } from "@/lib/api/client"

export function updateCatalog<T>(
  resource: string,
  id: string | number,
  payload: Record<string, unknown>
): Promise<T> {
  return api.patch<T>(`/admin/${resource}/${id}`, payload)
}
