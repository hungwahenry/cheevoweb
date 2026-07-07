"use client"

import { StatCard } from "@/components/common/stat-card"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useHealth } from "../hooks/use-health"

export function OpsHealth() {
  const { data, isLoading } = useHealth()

  if (isLoading || !data) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Database</CardTitle>
          <Badge variant={data.database.ok ? "default" : "destructive"}>
            {data.database.ok ? "Healthy" : "Down"}
          </Badge>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold tabular-nums">
            {data.database.latencyMs ?? "—"}
            <span className="text-base text-muted-foreground"> ms</span>
          </p>
        </CardContent>
      </Card>
      <StatCard
        label="Search index"
        value={(data.search.total ?? 0).toLocaleString()}
      />
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Push tokens</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tokens</span>
            <span className="tabular-nums">
              {data.push.tokens.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Devices</span>
            <span className="tabular-nums">
              {data.push.devices.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Stale</span>
            <span className="tabular-nums">
              {data.push.staleTokens.toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
