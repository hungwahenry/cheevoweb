"use client"

import { EntityRefItem } from "@/components/common/entity-ref"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { EntityRef } from "@/lib/api/types"
import { formatMoney } from "@/lib/format"

export interface LeaderboardRow {
  entity: EntityRef
  sublabel: string
  value: number
}

export function LeaderboardCard({
  title,
  rows,
  empty,
}: {
  title: string
  rows: LeaderboardRow[]
  empty: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">{empty}</p>
        ) : (
          <div className="space-y-1">
            {rows.map((row) => (
              <EntityRefItem
                key={row.entity.id}
                entity={row.entity}
                sublabel={row.sublabel}
                trailing={
                  <span className="text-sm font-medium tabular-nums">
                    {formatMoney(row.value)}
                  </span>
                }
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
