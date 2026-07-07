"use client"

import { format } from "date-fns"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import { useRevenue } from "../hooks/use-revenue"
import type { AnalyticsInterval } from "../types"

const config = {
  orders: { label: "Orders", color: "var(--chart-2)" },
} satisfies ChartConfig

interface OrdersChartProps {
  interval?: AnalyticsInterval
  days?: number
}

export function OrdersChart({ interval = "day", days = 30 }: OrdersChartProps) {
  const { data, isLoading } = useRevenue(interval, days)
  const series = data?.series ?? []

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Orders</CardTitle>
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
            <BarChart data={series} margin={{ left: 12, right: 12 }}>
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
                width={32}
                allowDecimals={false}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) =>
                      format(new Date(value as string), "d MMM yyyy")
                    }
                  />
                }
              />
              <Bar dataKey="orders" fill="var(--color-orders)" radius={4} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
