"use client"

import { format } from "date-fns"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import { formatMoney } from "@/lib/format"
import { useRevenue } from "../hooks/use-revenue"
import type { AnalyticsInterval } from "../types"

const config = {
  gmv: { label: "Revenue", color: "var(--chart-1)" },
} satisfies ChartConfig

interface RevenueChartProps {
  interval?: AnalyticsInterval
  days?: number
}

export function RevenueChart({
  interval = "day",
  days = 30,
}: RevenueChartProps) {
  const { data, isLoading } = useRevenue(interval, days)
  const series = (data?.series ?? []).map((point) => ({
    bucket: point.bucket,
    gmv: point.gmv_minor / 100,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-64 w-full" />
        ) : series.length === 0 ? (
          <p className="py-20 text-center text-sm text-muted-foreground">
            No paid orders in this range.
          </p>
        ) : (
          <ChartContainer config={config} className="h-64 w-full">
            <AreaChart data={series} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="bucket"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={24}
                tickFormatter={(value) => format(new Date(value), "d MMM")}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={64}
                tickFormatter={(value) => formatMoney(Number(value) * 100)}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) =>
                      format(new Date(value as string), "d MMM yyyy")
                    }
                    formatter={(value) => formatMoney(Number(value) * 100)}
                  />
                }
              />
              <Area
                dataKey="gmv"
                type="natural"
                stroke="var(--color-gmv)"
                fill="var(--color-gmv)"
                fillOpacity={0.15}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
