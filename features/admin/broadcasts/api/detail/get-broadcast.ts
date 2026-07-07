import { api } from "@/lib/api/client"
import type { BroadcastDetail } from "../../types"

export function getBroadcast(id: string): Promise<BroadcastDetail> {
  return api.get<BroadcastDetail>(`/admin/broadcasts/${id}`)
}
