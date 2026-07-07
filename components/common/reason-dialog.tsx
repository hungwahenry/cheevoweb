"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"

const schema = z.object({
  reason: z.string().trim().min(1, "A reason is required").max(1000),
})
type Values = z.infer<typeof schema>

interface ReasonDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  confirmLabel?: string
  destructive?: boolean
  pending?: boolean
  onConfirm: (reason: string) => void
}

/** Shared dialog for moderation actions that require a written reason (logged to audit). */
export function ReasonDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  destructive,
  pending,
  onConfirm,
}: ReasonDialogProps) {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { reason: "" },
  })

  useEffect(() => {
    if (open) form.reset({ reason: "" })
  }, [open, form])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <form
          id="reason-dialog"
          onSubmit={form.handleSubmit((values) => onConfirm(values.reason))}
          className="space-y-4"
        >
          <Field data-invalid={!!form.formState.errors.reason}>
            <FieldLabel htmlFor="reason">Reason</FieldLabel>
            <Textarea id="reason" rows={3} {...form.register("reason")} />
            {form.formState.errors.reason && (
              <FieldError>{form.formState.errors.reason.message}</FieldError>
            )}
          </Field>
        </form>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="reason-dialog"
            variant={destructive ? "destructive" : "default"}
            disabled={pending}
          >
            {pending ? <Spinner /> : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
