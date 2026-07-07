"use client"

import { AlertTriangle, Banknote, Flag } from "lucide-react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useOverview } from "../hooks/use-overview"
import type { AnalyticsOverview } from "../types"

const ITEMS = [
  {
    key: "open_reports",
    label: "Open reports",
    href: "/dashboard/reports",
    icon: Flag,
  },
  {
    key: "pending_payouts",
    label: "Pending payouts",
    href: "/dashboard/payouts",
    icon: Banknote,
  },
  {
    key: "failed_payouts",
    label: "Failed payouts",
    href: "/dashboard/payouts",
    icon: AlertTriangle,
  },
] as const satisfies ReadonlyArray<{
  key: keyof AnalyticsOverview["action_items"]
  label: string
  href: string
  icon: typeof Flag
}>

export function ActionItems() {
  const { data } = useOverview()
  if (!data) return null

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {ITEMS.map((item) => {
        const count = data.action_items[item.key]
        return (
          <Link key={item.key} href={item.href}>
            <Card className="transition-colors hover:bg-accent">
              <CardContent className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="text-2xl font-semibold tabular-nums">{count}</p>
                </div>
                <item.icon
                  className={cn(
                    "size-5",
                    count > 0 ? "text-destructive" : "text-muted-foreground"
                  )}
                />
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
