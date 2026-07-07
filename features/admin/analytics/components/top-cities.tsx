"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatMoney } from "@/lib/format"
import type { CityRevenue } from "../types"

export function TopCities({ items }: { items: CityRevenue[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Top cities</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No located buyers in this range.
          </p>
        ) : (
          <ul className="space-y-2.5">
            {items.map((city) => (
              <li
                key={city.city}
                className="flex items-center justify-between text-sm"
              >
                <span>{city.city}</span>
                <span className="text-muted-foreground tabular-nums">
                  {formatMoney(city.gmv_minor)} · {city.orders}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
