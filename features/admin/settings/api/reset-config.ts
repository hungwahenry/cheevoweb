import { api } from "@/lib/api/client"
import type { SystemConfig } from "../types"

export function resetConfig(id: string): Promise<SystemConfig> {
  return api.post<SystemConfig>(`/admin/system-configs/${id}/reset`)
}
