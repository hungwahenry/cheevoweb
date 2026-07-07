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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { usePayoutActions } from "../../hooks/detail/use-payout-actions"

interface ApprovePayoutDialogProps {
  payoutId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ApprovePayoutDialog({
  payoutId,
  open,
  onOpenChange,
}: ApprovePayoutDialogProps) {
  const { approve } = usePayoutActions(payoutId)
  const [method, setMethod] = useState<"provider" | "manual">("provider")
  const [note, setNote] = useState("")

  function handleOpenChange(next: boolean) {
    if (!next) {
      setMethod("provider")
      setNote("")
    }
    onOpenChange(next)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Approve payout</DialogTitle>
          <DialogDescription>
            Provider initiates a bank transfer automatically; manual means you
            settle it yourself and mark it paid.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Field>
            <FieldLabel>Method</FieldLabel>
            <Select
              value={method}
              onValueChange={(value) =>
                setMethod(value as "provider" | "manual")
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="provider">Provider transfer</SelectItem>
                <SelectItem value="manual">Manual settlement</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor="approve-note">Note (optional)</FieldLabel>
            <Textarea
              id="approve-note"
              rows={2}
              value={note}
              onChange={(event) => setNote(event.target.value)}
            />
          </Field>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button
            disabled={approve.isPending}
            onClick={() =>
              approve.mutate(
                { method, note: note || undefined },
                { onSuccess: () => handleOpenChange(false) }
              )
            }
          >
            {approve.isPending ? <Spinner /> : "Approve"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
