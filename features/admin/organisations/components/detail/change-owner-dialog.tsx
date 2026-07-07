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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useChangeOwner } from "../../hooks/detail/use-change-owner";
import type { OrgMemberRef } from "../../types";

interface ChangeOwnerDialogProps {
  orgId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  members: OrgMemberRef[];
}

export function ChangeOwnerDialog({
  orgId,
  open,
  onOpenChange,
  members,
}: ChangeOwnerDialogProps) {
  const change = useChangeOwner(orgId);
  const [userId, setUserId] = useState("");
  const [reason, setReason] = useState("");
  const candidates = members.filter((member) => member.role !== "owner");

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
          <DialogTitle>Change owner</DialogTitle>
          <DialogDescription>
            The new owner must already be a member of the organisation.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Field>
            <FieldLabel>New owner</FieldLabel>
            <Select value={userId} onValueChange={setUserId}>
              <SelectTrigger>
                <SelectValue placeholder="Select a member" />
              </SelectTrigger>
              <SelectContent>
                {candidates.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor="owner-reason">Reason (optional)</FieldLabel>
            <Textarea
              id="owner-reason"
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
            disabled={!userId || change.isPending}
            onClick={() =>
              change.mutate(
                { userId, reason: reason || undefined },
                { onSuccess: () => handleOpenChange(false) },
              )
            }
          >
            {change.isPending ? <Spinner /> : "Change owner"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
