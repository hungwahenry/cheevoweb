"use client"

import { Ban, CheckCircle2, Undo2 } from "lucide-react"
import { useState } from "react"
import { ConfirmDialog } from "@/components/common/confirm-dialog"
import { ReasonDialog } from "@/components/common/reason-dialog"
import { Button } from "@/components/ui/button"
import { formatMoney } from "@/lib/format"
import { useOrderActions } from "../../hooks/detail/use-order-actions"
import type { OrderDetail } from "../../types"

export function OrderActions({ order }: { order: OrderDetail }) {
  const [refundOpen, setRefundOpen] = useState(false)
  const [cancelOpen, setCancelOpen] = useState(false)
  const { refund, cancel, markPaid } = useOrderActions(order.id)

  return (
    <div className="flex flex-wrap items-center gap-2">
      {order.status === "pending" && (
        <Button
          variant="outline"
          onClick={() => markPaid.mutate()}
          disabled={markPaid.isPending}
        >
          <CheckCircle2 />
          Mark paid
        </Button>
      )}
      {order.status === "paid" && (
        <Button variant="outline" onClick={() => setRefundOpen(true)}>
          <Undo2 />
          Refund
        </Button>
      )}
      {(order.status === "pending" || order.status === "paid") && (
        <Button variant="destructive" onClick={() => setCancelOpen(true)}>
          <Ban />
          Cancel
        </Button>
      )}

      <ReasonDialog
        open={refundOpen}
        onOpenChange={setRefundOpen}
        title="Refund order"
        description={`Refunds the full ${formatMoney(order.total_minor)} and revokes unscanned tickets.`}
        confirmLabel="Refund"
        destructive
        pending={refund.isPending}
        onConfirm={(reason) =>
          refund.mutate(
            { amountMinor: order.total_minor, reason },
            { onSuccess: () => setRefundOpen(false) }
          )
        }
      />
      <ConfirmDialog
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        title="Cancel this order?"
        description="Releases any held inventory. This can't be undone."
        confirmLabel="Cancel order"
        pending={cancel.isPending}
        onConfirm={() =>
          cancel.mutate(undefined, { onSuccess: () => setCancelOpen(false) })
        }
      />
    </div>
  )
}
