"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { formatMoney } from "@/lib/format"
import { useAdjustBalance } from "../../hooks/detail/use-adjust-balance"

interface AdjustBalanceDialogProps {
  orgId: string
  direction: "credit" | "debit"
  availableMinor: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AdjustBalanceDialog({
  orgId,
  direction,
  availableMinor,
  open,
  onOpenChange,
}: AdjustBalanceDialogProps) {
  const adjust = useAdjustBalance(orgId)
  const [amount, setAmount] = useState("")
  const [reason, setReason] = useState("")

  const naira = Number(amount)
  const amountMinor = Math.round(naira * 100)
  const isCredit = direction === "credit"
  const overDebit = !isCredit && amountMinor > availableMinor
  const valid =
    amount.trim() !== "" &&
    Number.isFinite(naira) &&
    amountMinor >= 1 &&
    reason.trim().length > 0 &&
    !overDebit

  function handleOpenChange(next: boolean) {
    if (!next) {
      setAmount("")
      setReason("")
    }
    onOpenChange(next)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isCredit ? "Credit balance" : "Debit balance"}
          </DialogTitle>
          <DialogDescription>
            {isCredit
              ? "Adds funds to the organiser's available balance immediately."
              : "Removes funds from the organiser's available balance immediately."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Field>
            <FieldLabel htmlFor="adjust-amount">Amount (₦)</FieldLabel>
            <Input
              id="adjust-amount"
              type="number"
              min={0}
              step="0.01"
              inputMode="decimal"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="0.00"
            />
            {!isCredit && (
              <p className="text-muted-foreground text-xs">
                Available: {formatMoney(availableMinor)}
              </p>
            )}
            {overDebit && (
              <p className="text-destructive text-xs">
                Exceeds the available balance.
              </p>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="adjust-reason">Reason</FieldLabel>
            <Textarea
              id="adjust-reason"
              rows={2}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              maxLength={500}
              placeholder="Recorded on the ledger entry and audit log…"
            />
          </Field>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant={isCredit ? "default" : "destructive"}
            disabled={!valid || adjust.isPending}
            onClick={() =>
              adjust.mutate(
                { direction, amount_minor: amountMinor, reason: reason.trim() },
                { onSuccess: () => handleOpenChange(false) }
              )
            }
          >
            {adjust.isPending ? <Spinner /> : isCredit ? "Credit" : "Debit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
