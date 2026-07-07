"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { reportReasonSchema, type ReportReasonValues } from "../schemas"
import type { ReportReason, ReportScope } from "../types"

const SCOPES: { value: ReportScope; label: string }[] = [
  { value: "event", label: "Event" },
  { value: "comment", label: "Comment" },
  { value: "user", label: "User" },
  { value: "organisation", label: "Organisation" },
]

const EMPTY: ReportReasonValues = {
  label: "",
  slug: "",
  description: "",
  scope_types: [],
  requires_details: false,
  display_order: 0,
  is_active: true,
}

interface ReportReasonFormProps {
  open: boolean
  item: ReportReason | null
  pending?: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: ReportReasonValues) => void
}

export function ReportReasonForm({
  open,
  item,
  pending,
  onOpenChange,
  onSubmit,
}: ReportReasonFormProps) {
  const form = useForm<ReportReasonValues>({
    resolver: zodResolver(reportReasonSchema),
    defaultValues: EMPTY,
  })

  useEffect(() => {
    if (open) {
      form.reset(
        item
          ? {
              label: item.label,
              slug: item.slug,
              description: item.description ?? "",
              scope_types: item.scope_types,
              requires_details: item.requires_details,
              display_order: item.display_order,
              is_active: item.is_active,
            }
          : EMPTY
      )
    }
  }, [open, item, form])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {item ? "Edit report reason" : "New report reason"}
          </DialogTitle>
        </DialogHeader>
        <form
          id="reason-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <Field data-invalid={!!form.formState.errors.label}>
            <FieldLabel htmlFor="label">Label</FieldLabel>
            <Input id="label" {...form.register("label")} />
            {form.formState.errors.label && (
              <FieldError>{form.formState.errors.label.message}</FieldError>
            )}
          </Field>
          <Field data-invalid={!!form.formState.errors.slug}>
            <FieldLabel htmlFor="slug">Slug</FieldLabel>
            <Input id="slug" {...form.register("slug")} />
            {form.formState.errors.slug && (
              <FieldError>{form.formState.errors.slug.message}</FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              rows={2}
              {...form.register("description")}
            />
          </Field>
          <Controller
            control={form.control}
            name="scope_types"
            render={({ field }) => (
              <Field>
                <FieldLabel>Applies to</FieldLabel>
                <div className="flex flex-wrap gap-4 pt-1">
                  {SCOPES.map((scope) => (
                    <label
                      key={scope.value}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Checkbox
                        checked={field.value.includes(scope.value)}
                        onCheckedChange={(checked) =>
                          field.onChange(
                            checked
                              ? [...field.value, scope.value]
                              : field.value.filter((v) => v !== scope.value)
                          )
                        }
                      />
                      {scope.label}
                    </label>
                  ))}
                </div>
              </Field>
            )}
          />
          <Field>
            <FieldLabel htmlFor="display_order">Display order</FieldLabel>
            <Input
              id="display_order"
              type="number"
              {...form.register("display_order", { valueAsNumber: true })}
            />
          </Field>
          <Controller
            control={form.control}
            name="requires_details"
            render={({ field }) => (
              <Field
                orientation="horizontal"
                className="items-center justify-between"
              >
                <FieldLabel htmlFor="requires_details">
                  Requires details
                </FieldLabel>
                <Switch
                  id="requires_details"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="is_active"
            render={({ field }) => (
              <Field
                orientation="horizontal"
                className="items-center justify-between"
              >
                <FieldLabel htmlFor="is_active">Active</FieldLabel>
                <Switch
                  id="is_active"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </Field>
            )}
          />
        </form>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" form="reason-form" disabled={pending}>
            {pending ? <Spinner /> : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
