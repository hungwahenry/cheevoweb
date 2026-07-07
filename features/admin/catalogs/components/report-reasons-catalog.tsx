"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { useState } from "react"
import { ConfirmDialog } from "@/components/common/confirm-dialog"
import { Badge } from "@/components/ui/badge"
import { useCatalog } from "../hooks/use-catalog"
import { useCatalogMutations } from "../hooks/use-catalog-mutations"
import type { ReportReasonValues } from "../schemas"
import type { ReportReason } from "../types"
import { CatalogTable } from "./catalog-table"
import { ReportReasonForm } from "./report-reason-form"

const RESOURCE = "report-reasons"

export function ReportReasonsCatalog() {
  const { data, isLoading } = useCatalog<ReportReason>(RESOURCE)
  const { create, update, remove } = useCatalogMutations(
    RESOURCE,
    "Report reason"
  )
  const [editing, setEditing] = useState<ReportReason | null | undefined>(
    undefined
  )
  const [deleting, setDeleting] = useState<ReportReason | null>(null)

  const columns: ColumnDef<ReportReason>[] = [
    { accessorKey: "label", header: "Label" },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ row }) => (
        <code className="text-xs text-muted-foreground">
          {row.original.slug}
        </code>
      ),
    },
    {
      id: "scopes",
      header: "Applies to",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {row.original.scope_types.map((scope) => (
            <Badge key={scope} variant="secondary" className="capitalize">
              {scope}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      id: "active",
      header: "Active",
      cell: ({ row }) =>
        row.original.is_active ? (
          <Badge variant="outline">Active</Badge>
        ) : (
          <Badge variant="secondary">Hidden</Badge>
        ),
    },
  ]

  function submit(values: ReportReasonValues) {
    const payload = { ...values, description: values.description || null }
    if (editing) {
      update.mutate(
        { id: editing.id, payload },
        { onSuccess: () => setEditing(undefined) }
      )
    } else {
      create.mutate(payload, { onSuccess: () => setEditing(undefined) })
    }
  }

  return (
    <>
      <CatalogTable
        singular="Report reason"
        columns={columns}
        data={data ?? []}
        isLoading={isLoading}
        onAdd={() => setEditing(null)}
        onEdit={setEditing}
        onDelete={setDeleting}
      />
      <ReportReasonForm
        open={editing !== undefined}
        item={editing ?? null}
        pending={create.isPending || update.isPending}
        onOpenChange={(open) => {
          if (!open) setEditing(undefined)
        }}
        onSubmit={submit}
      />
      <ConfirmDialog
        open={deleting !== null}
        onOpenChange={(open) => {
          if (!open) setDeleting(null)
        }}
        title={`Delete ${deleting?.label ?? ""}?`}
        description="Reasons already referenced by reports can't be deleted."
        pending={remove.isPending}
        onConfirm={() => {
          if (deleting) {
            remove.mutate(deleting.id, { onSuccess: () => setDeleting(null) })
          }
        }}
      />
    </>
  )
}
