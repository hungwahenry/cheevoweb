"use client"

import { RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePayoutActions } from "../../hooks/detail/use-payout-actions"
import type { Payout } from "../../types"

export function PayoutActions({ payout }: { payout: Payout }) {
  const { retry } = usePayoutActions(payout.id)

  if (payout.status !== "failed") {
    return null
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant="outline"
        onClick={() => retry.mutate()}
        disabled={retry.isPending}
      >
        <RefreshCw />
        Retry transfer
      </Button>
    </div>
  )
}
