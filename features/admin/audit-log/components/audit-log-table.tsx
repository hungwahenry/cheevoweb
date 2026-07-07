"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { parseAsString, useQueryState } from "nuqs"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table/data-table"
import { DataTablePagination } from "@/components/data-table/data-table-pagination"
import { DataTableSearch } from "@/components/data-table/data-table-search"
import type { AuditEntry } from "@/lib/api/types"
import { useTableParams } from "@/lib/table/use-table-params"
import { formatDateTime } from "@/lib/format"
import { useAuditLog } from "../hooks/use-audit-log"

const columns: ColumnDef<AuditEntry>[] = [
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => (
      <code className="text-sm font-medium">{row.original.action}</code>
    ),
  },
  {
    id: "admin",
    header: "Admin",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.admin.label}</span>
    ),
  },
  {
    id: "target",
    header: "Target",
    cell: ({ row }) =>
      row.original.target_type ? (
        <span className="text-xs text-muted-foreground capitalize">
          {row.original.target_type.replace("_", " ")}
          {row.original.target_id
            ? ` · ${row.original.target_id.slice(-8)}`
            : ""}
        </span>
      ) : (
        <span className="text-sm text-muted-foreground">—</span>
      ),
  },
  {
    id: "reason",
    header: "Reason",
    cell: ({ row }) => (
      <span className="line-clamp-1 max-w-xs text-sm text-muted-foreground">
        {row.original.reason ?? "—"}
      </span>
    ),
  },
  {
    accessorKey: "created_at",
    header: "When",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDateTime(row.original.created_at)}
      </span>
    ),
  },
]

export function AuditLogTable() {
  const [{ page, per_page }, setTable] = useTableParams()
  const [action, setAction] = useQueryState(
    "action",
    parseAsString.withDefault("")
  )

  const { data, isLoading, isFetching } = useAuditLog({
    page,
    per_page,
    action: action || undefined,
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <DataTableSearch
          defaultValue={action}
          placeholder="Filter by action (e.g. orders.refund)…"
          onSearch={(value) => {
            void setAction(value || null)
            void setTable({ page: 1 })
          }}
        />
        {action && (
          <Button
            variant="ghost"
            onClick={() => {
              void setAction(null)
              void setTable({ page: 1 })
            }}
          >
            Reset
          </Button>
        )}
      </div>

      <DataTable
        columns={columns}
        data={data?.items ?? []}
        isLoading={isLoading}
        emptyMessage="No admin actions recorded."
      />

      <DataTablePagination
        page={page}
        lastPage={data?.last_page ?? 1}
        total={data?.total ?? 0}
        onPageChange={(next) => void setTable({ page: next })}
        isLoading={isFetching}
      />
    </div>
  )
}
