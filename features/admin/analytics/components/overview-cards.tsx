"use client"

import { StatCard } from "@/components/admin/common/stat-card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatMoney } from "@/lib/format"
import { useOverview } from "../hooks/use-overview"

const n = (value: number) => value.toLocaleString()
const pct = (ratio: number) => `${(ratio * 100).toFixed(1)}%`

export function OverviewCards() {
  const { data, isLoading } = useOverview()

  if (isLoading || !data) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <StatCard
        label="Platform profit"
        value={formatMoney(data.platform.profit_minor)}
      />
      <StatCard
        label="Profit (30d)"
        value={formatMoney(data.platform.profit_last_30d_minor)}
      />
      <StatCard
        label="Fees (gross)"
        value={formatMoney(data.platform.fees_minor)}
      />
      <StatCard label="Take rate" value={pct(data.platform.take_rate)} />

      <StatCard label="GMV (all time)" value={formatMoney(data.gmv.total_minor)} />
      <StatCard
        label="Organiser earnings"
        value={formatMoney(data.platform.earnings_minor)}
      />
      <StatCard
        label="Processing cost"
        value={formatMoney(data.platform.processing_minor)}
      />
      <StatCard
        label={`Refunds (${n(data.refunds.count)})`}
        value={formatMoney(data.refunds.total_minor)}
      />

      <StatCard label="Paid orders" value={n(data.orders.paid)} />
      <StatCard label="Published events" value={n(data.events.published)} />
      <StatCard label="Users" value={n(data.users.total)} />
      <StatCard label="Organisers" value={n(data.users.organisers)} />
    </div>
  )
}
