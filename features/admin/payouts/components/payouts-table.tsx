"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { parseAsStringLiteral, useQueryStates } from "nuqs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { useTableParams } from "@/lib/table/use-table-params";
import { formatDate, formatMoney } from "@/lib/format";
import { usePayouts } from "../hooks/use-payouts";
import type { Payout, PayoutStatus } from "../types";

const STATUS = [
  "all",
  "requested",
  "approved",
  "processing",
  "paid",
  "rejected",
  "failed",
] as const;

export const PAYOUT_STATUS_VARIANT: Record<
  PayoutStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  paid: "default",
  requested: "secondary",
  approved: "outline",
  processing: "outline",
  rejected: "destructive",
  failed: "destructive",
};

const columns: ColumnDef<Payout>[] = [
  {
    id: "org",
    header: "Organisation",
    cell: ({ row }) => (
      <div className="min-w-0">
        <p className="truncate font-medium">{row.original.organisation.name}</p>
        <p className="text-muted-foreground truncate text-xs">
          {row.original.account_name ?? row.original.bank_name ?? "—"}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "net_minor",
    header: "Net",
    cell: ({ row }) => (
      <span className="tabular-nums">{formatMoney(row.original.net_minor)}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={PAYOUT_STATUS_VARIANT[row.original.status]}
        className="capitalize"
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "requested_at",
    header: "Requested",
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">
        {formatDate(row.original.requested_at)}
      </span>
    ),
  },
];

export function PayoutsTable() {
  const router = useRouter();
  const [{ page, per_page }, setTable] = useTableParams();
  const [{ status }, setFilters] = useQueryStates(
    { status: parseAsStringLiteral(STATUS).withDefault("all") },
    { history: "push", clearOnDefault: true },
  );

  const { data, isLoading, isFetching } = usePayouts({
    page,
    per_page,
    status: status === "all" ? undefined : status,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Select
          value={status}
          onValueChange={(value) => {
            void setFilters({ status: value as (typeof STATUS)[number] });
            void setTable({ page: 1 });
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="requested">Requested</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        {status !== "all" && (
          <Button variant="ghost" onClick={() => void setFilters({ status: "all" })}>
            Reset
          </Button>
        )}
      </div>

      <DataTable
        columns={columns}
        data={data?.items ?? []}
        isLoading={isLoading}
        onRowClick={(payout) => router.push(`/dashboard/payouts/${payout.id}`)}
        emptyMessage="No payouts match this filter."
      />

      <DataTablePagination
        page={page}
        lastPage={data?.last_page ?? 1}
        total={data?.total ?? 0}
        onPageChange={(next) => void setTable({ page: next })}
        isLoading={isFetching}
      />
    </div>
  );
}
