"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { Trash2 } from "lucide-react"
import { parseAsStringLiteral, useQueryStates } from "nuqs"
import { useState } from "react"
import { ConfirmDialog } from "@/components/common/confirm-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DataTable } from "@/components/data-table/data-table"
import { DataTablePagination } from "@/components/data-table/data-table-pagination"
import { DataTableSearch } from "@/components/data-table/data-table-search"
import { useTableParams } from "@/lib/table/use-table-params"
import { formatDate } from "@/lib/format"
import { useDeleteSuppression } from "../../hooks/suppressions/use-delete-suppression"
import { useSuppressions } from "../../hooks/suppressions/use-suppressions"
import type { Suppression } from "../../types"

const REASON = ["all", "unsubscribed", "bounced", "complained"] as const

export function SuppressionsTable() {
  const [{ page, per_page, q }, setTable] = useTableParams()
  const [{ reason }, setFilters] = useQueryStates(
    { reason: parseAsStringLiteral(REASON).withDefault("all") },
    { history: "push", clearOnDefault: true }
  )
  const [deleting, setDeleting] = useState<Suppression | null>(null)
  const remove = useDeleteSuppression()

  const { data, isLoading, isFetching } = useSuppressions({
    page,
    per_page,
    q: q || undefined,
    reason: reason === "all" ? undefined : reason,
  })

  const columns: ColumnDef<Suppression>[] = [
    { accessorKey: "email", header: "Email" },
    {
      accessorKey: "reason",
      header: "Reason",
      cell: ({ row }) => (
        <Badge variant="secondary" className="capitalize">
          {row.original.reason}
        </Badge>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Suppressed",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {formatDate(row.original.created_at)}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => null,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Remove"
            onClick={() => setDeleting(row.original)}
          >
            <Trash2 className="size-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <DataTableSearch
          defaultValue={q}
          placeholder="Search email…"
          onSearch={(value) => void setTable({ q: value, page: 1 })}
        />
        <Select
          value={reason}
          onValueChange={(value) => {
            void setFilters({ reason: value as (typeof REASON)[number] })
            void setTable({ page: 1 })
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All reasons</SelectItem>
            <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
            <SelectItem value="bounced">Bounced</SelectItem>
            <SelectItem value="complained">Complained</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={columns}
        data={data?.items ?? []}
        isLoading={isLoading}
        emptyMessage="No suppressions match these filters."
      />

      <DataTablePagination
        page={page}
        lastPage={data?.last_page ?? 1}
        total={data?.total ?? 0}
        onPageChange={(next) => void setTable({ page: next })}
        isLoading={isFetching}
      />

      <ConfirmDialog
        open={deleting !== null}
        onOpenChange={(open) => !open && setDeleting(null)}
        title={`Remove ${deleting?.email ?? ""}?`}
        description="The address can receive broadcast emails again."
        confirmLabel="Remove"
        pending={remove.isPending}
        onConfirm={() => {
          if (deleting) {
            remove.mutate(deleting.id, { onSuccess: () => setDeleting(null) })
          }
        }}
      />
    </div>
  )
}
