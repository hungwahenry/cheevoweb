import { api } from "@/lib/api/client"
import type { EngagementSeries } from "../types"

export function getEngagement(days: number): Promise<EngagementSeries> {
  return api.get<EngagementSeries>("/admin/analytics/engagement", { days })
}
