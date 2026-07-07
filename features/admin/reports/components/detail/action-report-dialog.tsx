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
import type { ReportAction } from "../../types"

interface ActionReportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  pending?: boolean
  onSubmit: (action: ReportAction, note: string) => void
}

export function ActionReportDialog({
  open,
  onOpenChange,
  pending,
  onSubmit,
}: ActionReportDialogProps) {
  const [action, setAction] = useState<ReportAction>("delete_target")
  const [note, setNote] = useState("")

  function handleOpenChange(next: boolean) {
    if (!next) {
      setAction("delete_target")
      setNote("")
    }
    onOpenChange(next)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Resolve report</DialogTitle>
          <DialogDescription>
            Choose an outcome and record how it was resolved.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Field>
            <FieldLabel>Outcome</FieldLabel>
            <Select
              value={action}
              onValueChange={(value) => setAction(value as ReportAction)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delete_target">Delete target</SelectItem>
                <SelectItem value="warn">Warn</SelectItem>
                <SelectItem value="no_action">No action</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor="resolution">Resolution note</FieldLabel>
            <Textarea
              id="resolution"
              rows={3}
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
            disabled={note.trim().length === 0 || pending}
            onClick={() => onSubmit(action, note)}
          >
            {pending ? <Spinner /> : "Resolve"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
