"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { formatMoney } from "@/lib/format"
import type { CategoryRevenue } from "../types"

export function RevenueByCategory({ items }: { items: CategoryRevenue[] }) {
  const max = Math.max(1, ...items.map((item) => item.gmv_minor))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Revenue by category</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No paid orders in this range.
          </p>
        ) : (
          items.map((item) => (
            <div key={item.category.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span>{item.category.name}</span>
                <span className="text-muted-foreground tabular-nums">
                  {formatMoney(item.gmv_minor)}
                </span>
              </div>
              <Progress value={(item.gmv_minor / max) * 100} />
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
