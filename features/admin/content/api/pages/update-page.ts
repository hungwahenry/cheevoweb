import { api } from "@/lib/api/client"
import type { Page } from "../../types"

export function updatePage(
  id: string,
  payload: Record<string, unknown>
): Promise<Page> {
  return api.patch<Page>(`/admin/pages/${id}`, payload)
}
