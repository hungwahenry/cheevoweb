import { api } from "@/lib/api/client"
import type { BroadcastKind, Segment } from "../types"

export function previewBroadcast(
  kind: BroadcastKind,
  audience: Segment
): Promise<{ recipients: number }> {
  return api.post<{ recipients: number }>("/admin/announcements/preview", {
    kind,
    audience,
  })
}
