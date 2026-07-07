"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
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
import { simpleCatalogSchema, type SimpleCatalogValues } from "../schemas"
import type { SimpleCatalogItem } from "../types"

interface SimpleCatalogFormProps {
  open: boolean
  item: SimpleCatalogItem | null
  singular: string
  hasBaseUrl?: boolean
  pending?: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: SimpleCatalogValues) => void
}

const EMPTY: SimpleCatalogValues = {
  name: "",
  slug: "",
  sort_order: 0,
  is_active: true,
  base_url: "",
}

export function SimpleCatalogForm({
  open,
  item,
  singular,
  hasBaseUrl,
  pending,
  onOpenChange,
  onSubmit,
}: SimpleCatalogFormProps) {
  const form = useForm<SimpleCatalogValues>({
    resolver: zodResolver(simpleCatalogSchema),
    defaultValues: EMPTY,
  })

  useEffect(() => {
    if (open) {
      form.reset(
        item
          ? {
              name: item.name,
              slug: item.slug,
              sort_order: item.sort_order,
              is_active: item.is_active,
              base_url: item.base_url ?? "",
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
            {item
              ? `Edit ${singular.toLowerCase()}`
              : `New ${singular.toLowerCase()}`}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
          id="catalog-form"
        >
          <Field data-invalid={!!form.formState.errors.name}>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input id="name" {...form.register("name")} />
            {form.formState.errors.name && (
              <FieldError>{form.formState.errors.name.message}</FieldError>
            )}
          </Field>
          <Field data-invalid={!!form.formState.errors.slug}>
            <FieldLabel htmlFor="slug">Slug</FieldLabel>
            <Input id="slug" {...form.register("slug")} />
            {form.formState.errors.slug && (
              <FieldError>{form.formState.errors.slug.message}</FieldError>
            )}
          </Field>
          {hasBaseUrl && (
            <Field data-invalid={!!form.formState.errors.base_url}>
              <FieldLabel htmlFor="base_url">Base URL</FieldLabel>
              <Input
                id="base_url"
                placeholder="https://"
                {...form.register("base_url")}
              />
              {form.formState.errors.base_url && (
                <FieldError>
                  {form.formState.errors.base_url.message}
                </FieldError>
              )}
            </Field>
          )}
          <Field>
            <FieldLabel htmlFor="sort_order">Sort order</FieldLabel>
            <Input
              id="sort_order"
              type="number"
              {...form.register("sort_order", { valueAsNumber: true })}
            />
          </Field>
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
          <Button type="submit" form="catalog-form" disabled={pending}>
            {pending ? <Spinner /> : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
