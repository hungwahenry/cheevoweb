"use client"

import { CheckCircle2, RefreshCw } from "lucide-react"
import { useState } from "react"
import { ConfirmDialog } from "@/components/admin/common/confirm-dialog"
import { Button } from "@/components/ui/button"
import { usePaymentActions } from "../../hooks/detail/use-payment-actions"
import type { PaymentDetail } from "../../types"

export function PaymentActions({ payment }: { payment: PaymentDetail }) {
  const [markOpen, setMarkOpen] = useState(false)
  const { resync, markSuccess } = usePaymentActions(payment.id)

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant="outline"
        onClick={() => resync.mutate()}
        disabled={resync.isPending}
      >
        <RefreshCw />
        Re-sync
      </Button>
      {payment.status !== "successful" && (
        <Button variant="outline" onClick={() => setMarkOpen(true)}>
          <CheckCircle2 />
          Mark successful
        </Button>
      )}

      <ConfirmDialog
        open={markOpen}
        onOpenChange={setMarkOpen}
        title="Force payment to successful?"
        description="Use only when the provider confirms payment out-of-band. This fulfils the order."
        confirmLabel="Mark successful"
        destructive={false}
        pending={markSuccess.isPending}
        onConfirm={() =>
          markSuccess.mutate(undefined, {
            onSuccess: () => setMarkOpen(false),
          })
        }
      />
    </div>
  )
}
