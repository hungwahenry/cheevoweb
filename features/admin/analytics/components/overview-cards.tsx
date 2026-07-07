"use client"

import { StatCard } from "@/components/common/stat-card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatMoney } from "@/lib/format"
import { useOverview } from "../hooks/use-overview"

const n = (value: number) => value.toLocaleString()

export function OverviewCards() {
  const { data, isLoading } = useOverview()

  if (isLoading || !data) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <StatCard
        label="GMV (all time)"
        value={formatMoney(data.gmv.total_minor)}
      />
      <StatCard
        label="GMV (30d)"
        value={formatMoney(data.gmv.last_30d_minor)}
      />
      <StatCard label="Paid orders" value={n(data.orders.paid)} />
      <StatCard label="Published events" value={n(data.events.published)} />
      <StatCard label="Users" value={n(data.users.total)} />
      <StatCard label="New users (30d)" value={n(data.users.new_30d)} />
      <StatCard label="Organisers" value={n(data.users.organisers)} />
      <StatCard label="Organisations" value={n(data.organisations.total)} />
    </div>
  )
}
