"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import { parseAsStringLiteral, useQueryStates } from "nuqs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DataTable } from "@/components/admin/data-table/data-table"
import { DataTablePagination } from "@/components/admin/data-table/data-table-pagination"
import { useTableParams } from "@/lib/table/use-table-params"
import { formatDate, formatMoney } from "@/lib/format"
import { useOrders } from "../hooks/use-orders"
import type { OrderRow, OrderStatus } from "../types"

const STATUS = ["all", "pending", "paid", "cancelled", "refunded"] as const

export const ORDER_STATUS_VARIANT: Record<
  OrderStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  paid: "default",
  pending: "secondary",
  refunded: "outline",
  cancelled: "destructive",
}

const columns: ColumnDef<OrderRow>[] = [
  {
    id: "buyer",
    header: "Buyer",
    cell: ({ row }) => (
      <div className="min-w-0">
        <p className="truncate font-medium">{row.original.buyer.label}</p>
        <p className="truncate text-xs text-muted-foreground">
          {row.original.event.label}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={ORDER_STATUS_VARIANT[row.original.status]}
        className="capitalize"
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "total_minor",
    header: "Total",
    cell: ({ row }) => (
      <span className="tabular-nums">
        {formatMoney(row.original.total_minor)}
      </span>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDate(row.original.created_at)}
      </span>
    ),
  },
]

export function OrdersTable() {
  const router = useRouter()
  const [{ page, per_page }, setTable] = useTableParams()
  const [{ status }, setFilters] = useQueryStates(
    { status: parseAsStringLiteral(STATUS).withDefault("all") },
    { history: "push", clearOnDefault: true }
  )

  const { data, isLoading, isFetching } = useOrders({
    page,
    per_page,
    status: status === "all" ? undefined : status,
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Select
          value={status}
          onValueChange={(value) => {
            void setFilters({ status: value as (typeof STATUS)[number] })
            void setTable({ page: 1 })
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
          </SelectContent>
        </Select>
        {status !== "all" && (
          <Button
            variant="ghost"
            onClick={() => void setFilters({ status: "all" })}
          >
            Reset
          </Button>
        )}
      </div>

      <DataTable
        columns={columns}
        data={data?.items ?? []}
        isLoading={isLoading}
        onRowClick={(order) => router.push(`/dashboard/orders/${order.id}`)}
        emptyMessage="No orders match this filter."
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
