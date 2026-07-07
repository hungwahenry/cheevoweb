"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { usePayments } from "../hooks/use-payments"

const pct = (rate: number) => `${(rate * 100).toFixed(1)}%`

export function PaymentsBreakdown({ days = 30 }: { days?: number }) {
  const { data, isLoading } = usePayments(days)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Payments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {isLoading || !data ? (
          <Skeleton className="h-40 w-full" />
        ) : (
          <>
            <div>
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">
                  Overall success rate
                </span>
                <span className="text-2xl font-semibold tabular-nums">
                  {pct(data.totals.success_rate)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {data.totals.successful.toLocaleString()} of{" "}
                {data.totals.total.toLocaleString()} succeeded
              </p>
            </div>
            {Object.keys(data.by_provider).length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No payments in this range.
              </p>
            ) : (
              <div className="space-y-3">
                {Object.entries(data.by_provider).map(([provider, stats]) => (
                  <div key={provider} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="capitalize">{provider}</span>
                      <span className="text-muted-foreground tabular-nums">
                        {pct(stats.success_rate)} ·{" "}
                        {stats.total.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={stats.success_rate * 100} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
