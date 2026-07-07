"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { parseAsStringLiteral, useQueryStates } from "nuqs"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import { useIssuedTickets } from "../hooks/use-issued-tickets"
import { useTicketActions } from "../hooks/use-ticket-actions"
import type { IssuedTicket, IssuedTicketStatus } from "../types"
import { TransferTicketDialog } from "./transfer-ticket-dialog"

const STATUS = ["all", "valid", "scanned", "revoked"] as const

const STATUS_VARIANT: Record<
  IssuedTicketStatus,
  "default" | "secondary" | "destructive"
> = {
  valid: "default",
  scanned: "secondary",
  revoked: "destructive",
}

export function IssuedTicketsTable() {
  const [{ page, per_page, q }, setTable] = useTableParams()
  const [{ status }, setFilters] = useQueryStates(
    { status: parseAsStringLiteral(STATUS).withDefault("all") },
    { history: "push", clearOnDefault: true }
  )
  const [transferring, setTransferring] = useState<IssuedTicket | null>(null)
  const actions = useTicketActions()

  const { data, isLoading, isFetching } = useIssuedTickets({
    page,
    per_page,
    q: q || undefined,
    status: status === "all" ? undefined : status,
  })

  const columns: ColumnDef<IssuedTicket>[] = [
    {
      id: "ticket",
      header: "Ticket",
      cell: ({ row }) => (
        <div className="min-w-0">
          <code className="text-xs text-muted-foreground">
            {row.original.code.slice(-12)}
          </code>
          <p className="truncate text-sm">{row.original.ticket_name}</p>
        </div>
      ),
    },
    {
      id: "holder",
      header: "Holder",
      cell: ({ row }) => (
        <div className="min-w-0">
          <p className="truncate text-sm">{row.original.holder.label}</p>
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
          variant={STATUS_VARIANT[row.original.status]}
          className="capitalize"
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Issued",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {formatDate(row.original.created_at)}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => null,
      cell: ({ row }) => {
        const ticket = row.original
        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Actions">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {ticket.status !== "revoked" && (
                  <DropdownMenuItem
                    onClick={() => actions.revoke.mutate(ticket.id)}
                  >
                    Revoke
                  </DropdownMenuItem>
                )}
                {ticket.status === "revoked" && (
                  <DropdownMenuItem
                    onClick={() => actions.reissue.mutate(ticket.id)}
                  >
                    Reissue
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => setTransferring(ticket)}>
                  Transfer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <DataTableSearch
          defaultValue={q}
          placeholder="Search ticket code…"
          onSearch={(value) => void setTable({ q: value, page: 1 })}
        />
        <Select
          value={status}
          onValueChange={(value) => {
            void setFilters({ status: value as (typeof STATUS)[number] })
            void setTable({ page: 1 })
          }}
        >
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="valid">Valid</SelectItem>
            <SelectItem value="scanned">Scanned</SelectItem>
            <SelectItem value="revoked">Revoked</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={columns}
        data={data?.items ?? []}
        isLoading={isLoading}
        emptyMessage="No tickets match these filters."
      />

      <DataTablePagination
        page={page}
        lastPage={data?.last_page ?? 1}
        total={data?.total ?? 0}
        onPageChange={(next) => void setTable({ page: next })}
        isLoading={isFetching}
      />

      <TransferTicketDialog
        open={transferring !== null}
        onOpenChange={(open) => !open && setTransferring(null)}
        pending={actions.transfer.isPending}
        onSubmit={(toUserId, reason) => {
          if (transferring) {
            actions.transfer.mutate(
              { id: transferring.id, toUserId, reason },
              { onSuccess: () => setTransferring(null) }
            )
          }
        }}
      />
    </div>
  )
}
