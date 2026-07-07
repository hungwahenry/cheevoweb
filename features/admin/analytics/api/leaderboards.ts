import { api } from "@/lib/api/client"
import type { Leaderboards } from "../types"

export function getLeaderboards(
  days: number,
  limit: number
): Promise<Leaderboards> {
  return api.get<Leaderboards>("/admin/analytics/leaderboards", { days, limit })
}
