"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";

interface TransferTicketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pending?: boolean;
  onSubmit: (toUserId: string, reason?: string) => void;
}

export function TransferTicketDialog({
  open,
  onOpenChange,
  pending,
  onSubmit,
}: TransferTicketDialogProps) {
  const [userId, setUserId] = useState("");
  const [reason, setReason] = useState("");

  function handleOpenChange(next: boolean) {
    if (!next) {
      setUserId("");
      setReason("");
    }
    onOpenChange(next);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transfer ticket</DialogTitle>
          <DialogDescription>
            Reassign this ticket to another account by its user ID.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Field>
            <FieldLabel htmlFor="to-user">New holder (user ID)</FieldLabel>
            <Input
              id="to-user"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              placeholder="26-character user ID"
            />
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
            disabled={userId.length !== 26 || pending}
            onClick={() => onSubmit(userId, reason || undefined)}
          >
            {pending ? <Spinner /> : "Transfer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
