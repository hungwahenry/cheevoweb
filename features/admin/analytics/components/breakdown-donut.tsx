"use client"

import { Cell, Pie, PieChart } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export interface DonutSlice {
  key: string
  label: string
  value: number
  color: string
}

export function BreakdownDonut({
  title,
  slices,
}: {
  title: string
  slices: DonutSlice[]
}) {
  const total = slices.reduce((sum, slice) => sum + slice.value, 0)
  const config: ChartConfig = Object.fromEntries(
    slices.map((slice) => [slice.key, { label: slice.label }])
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-6">
        {total === 0 ? (
          <p className="py-10 text-sm text-muted-foreground">No data yet.</p>
        ) : (
          <>
            <ChartContainer config={config} className="aspect-square h-36">
              <PieChart>
                <ChartTooltip
                  content={<ChartTooltipContent nameKey="label" />}
                />
                <Pie
                  data={slices}
                  dataKey="value"
                  nameKey="label"
                  innerRadius={42}
                  strokeWidth={2}
                >
                  {slices.map((slice) => (
                    <Cell key={slice.key} fill={slice.color} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            <ul className="flex-1 space-y-2 text-sm">
              {slices.map((slice) => (
                <li key={slice.key} className="flex items-center gap-2">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ background: slice.color }}
                  />
                  <span className="text-muted-foreground">{slice.label}</span>
                  <span className="ml-auto font-medium tabular-nums">
                    {slice.value.toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
    </Card>
  )
}
