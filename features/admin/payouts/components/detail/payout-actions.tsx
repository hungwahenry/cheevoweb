"use client"

import { useState } from "react"
import { Check, RefreshCw, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { usePayoutActions } from "../../hooks/detail/use-payout-actions"
import type { Payout } from "../../types"

export function PayoutActions({ payout }: { payout: Payout }) {
  const { retry, approve, reject } = usePayoutActions(payout.id)
  const [rejectOpen, setRejectOpen] = useState(false)
  const [notes, setNotes] = useState("")

  if (payout.status === "pending_review") {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <Button onClick={() => approve.mutate()} disabled={approve.isPending}>
          <Check />
          Approve payout
        </Button>
        <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive" disabled={reject.isPending}>
              <X />
              Reject
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject payout</DialogTitle>
              <DialogDescription>
                The organiser is notified and the amount returns to their
                available balance.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Label htmlFor="reject-notes">Reason (optional)</Label>
              <Textarea
                id="reject-notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Shared with the organiser…"
                maxLength={500}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRejectOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                disabled={reject.isPending}
                onClick={() =>
                  reject.mutate(notes.trim() || undefined, {
                    onSuccess: () => {
                      setRejectOpen(false)
                      setNotes("")
                    },
                  })
                }
              >
                Reject payout
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  if (payout.status === "failed") {
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

  return null
}
