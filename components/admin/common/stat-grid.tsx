import { StatCard } from "./stat-card"

export function StatGrid({
  stats,
}: {
  stats: { label: string; value: React.ReactNode }[]
}) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} label={stat.label} value={stat.value} />
      ))}
    </div>
  )
}
