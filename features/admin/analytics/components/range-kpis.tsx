"use client"

import { StatCard } from "@/components/common/stat-card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatMoney } from "@/lib/format"
import { useRevenue } from "../hooks/use-revenue"
import type { AnalyticsInterval } from "../types"

interface RangeKpisProps {
  interval: AnalyticsInterval
  days: number
}

export function RangeKpis({ interval, days }: RangeKpisProps) {
  const { data, isLoading } = useRevenue(interval, days)

  if (isLoading || !data) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
    )
  }

  const gmv = data.series.reduce((sum, point) => sum + point.gmv_minor, 0)
  const orders = data.series.reduce((sum, point) => sum + point.orders, 0)
  const aov = orders > 0 ? Math.round(gmv / orders) : 0

  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard label={`Revenue (${days}d)`} value={formatMoney(gmv)} />
      <StatCard label="Paid orders" value={orders.toLocaleString()} />
      <StatCard label="Avg order value" value={formatMoney(aov)} />
    </div>
  )
}
