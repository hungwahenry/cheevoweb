"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

interface ScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pending?: boolean;
  onConfirm: (isoDate: string) => void;
}

export function ScheduleDialog({
  open,
  onOpenChange,
  pending,
  onConfirm,
}: ScheduleDialogProps) {
  const [value, setValue] = useState("");

  function handleOpenChange(next: boolean) {
    if (!next) setValue("");
    onOpenChange(next);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule broadcast</DialogTitle>
        </DialogHeader>
        <Field>
          <FieldLabel htmlFor="schedule-at">Send at</FieldLabel>
          <Input
            id="schedule-at"
            type="datetime-local"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </Field>
        <DialogFooter>
          <Button variant="ghost" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button
            disabled={!value || pending}
            onClick={() => onConfirm(new Date(value).toISOString())}
          >
            {pending ? <Spinner /> : "Schedule"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
