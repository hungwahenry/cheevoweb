"use client"

import { StatCard } from "@/components/admin/common/stat-card"
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
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
    )
  }

  const profit = data.series.reduce((sum, point) => sum + point.profit_minor, 0)
  const fees = data.series.reduce((sum, point) => sum + point.fees_minor, 0)
  const gmv = data.series.reduce((sum, point) => sum + point.gmv_minor, 0)
  const orders = data.series.reduce((sum, point) => sum + point.orders, 0)

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <StatCard label={`Profit (${days}d)`} value={formatMoney(profit)} />
      <StatCard label={`Fees (${days}d)`} value={formatMoney(fees)} />
      <StatCard label={`GMV (${days}d)`} value={formatMoney(gmv)} />
      <StatCard label="Paid orders" value={orders.toLocaleString()} />
    </div>
  )
}
