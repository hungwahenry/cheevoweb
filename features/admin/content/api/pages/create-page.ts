import { api } from "@/lib/api/client"
import type { Page } from "../../types"

export function createPage(payload: Record<string, unknown>): Promise<Page> {
  return api.post<Page>("/admin/pages", payload)
}
