import { api } from "@/lib/api/client"
import type { AnalyticsOverview } from "../types"

export function getOverview(): Promise<AnalyticsOverview> {
  return api.get<AnalyticsOverview>("/admin/analytics/overview")
}
