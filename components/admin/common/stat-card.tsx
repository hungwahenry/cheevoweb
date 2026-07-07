import { Card, CardContent } from "@/components/ui/card"

interface StatCardProps {
  label: string
  value: React.ReactNode
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <Card className="gap-0 py-4">
      <CardContent className="px-4">
        <p className="text-xs tracking-wide text-muted-foreground uppercase">
          {label}
        </p>
        <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
      </CardContent>
    </Card>
  )
}
