"use client"

import { useState } from "react"
import {
  UserPicker,
  type PickedUser,
} from "@/components/admin/common/user-picker"
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
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"

interface TransferTicketDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  pending?: boolean
  onSubmit: (toUserId: string, reason?: string) => void
}

export function TransferTicketDialog({
  open,
  onOpenChange,
  pending,
  onSubmit,
}: TransferTicketDialogProps) {
  const [user, setUser] = useState<PickedUser | null>(null)
  const [reason, setReason] = useState("")

  function handleOpenChange(next: boolean) {
    if (!next) {
      setUser(null)
      setReason("")
    }
    onOpenChange(next)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer ticket</DialogTitle>
          <DialogDescription>
            Reassign this ticket to another account.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Field>
            <FieldLabel>New holder</FieldLabel>
            <UserPicker value={user} onChange={setUser} />
          </Field>
          <Field>
            <FieldLabel htmlFor="transfer-reason">Reason (optional)</FieldLabel>
            <Textarea
              id="transfer-reason"
              rows={2}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
            />
          </Field>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button
            disabled={!user || pending}
            onClick={() => user && onSubmit(user.id, reason || undefined)}
          >
            {pending ? <Spinner /> : "Transfer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
