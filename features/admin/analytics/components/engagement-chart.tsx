"use client"

import { format } from "date-fns"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import { useEngagement } from "../hooks/use-engagement"

const config = {
  comments: { label: "Comments", color: "var(--chart-1)" },
  rsvps: { label: "RSVPs", color: "var(--chart-2)" },
  subscriptions: { label: "Subscriptions", color: "var(--chart-3)" },
} satisfies ChartConfig

export function EngagementChart({ days = 30 }: { days?: number }) {
  const { data, isLoading } = useEngagement(days)
  const series = data?.series ?? []

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Engagement</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-64 w-full" />
        ) : series.length === 0 ? (
          <p className="py-20 text-center text-sm text-muted-foreground">
            No activity in this range.
          </p>
        ) : (
          <ChartContainer config={config} className="h-64 w-full">
            <LineChart data={series} margin={{ left: 12, right: 12 }}>
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
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                dataKey="comments"
                type="monotone"
                stroke="var(--color-comments)"
                dot={false}
              />
              <Line
                dataKey="rsvps"
                type="monotone"
                stroke="var(--color-rsvps)"
                dot={false}
              />
              <Line
                dataKey="subscriptions"
                type="monotone"
                stroke="var(--color-subscriptions)"
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
