import { api } from "@/lib/api/client";
import type { AnalyticsInterval, RevenueSeries } from "../types";

export function getRevenue(
  interval: AnalyticsInterval,
  days: number,
): Promise<RevenueSeries> {
  return api.get<RevenueSeries>("/admin/analytics/revenue", { interval, days });
}
