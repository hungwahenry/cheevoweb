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
import { usePayments } from "../hooks/use-payments";
import type { PaymentRow, PaymentStatus } from "../types";

const STATUS = [
  "all",
  "pending",
  "successful",
  "failed",
  "abandoned",
  "refunded",
] as const;
const PROVIDER = ["all", "paystack", "flutterwave"] as const;

export const PAYMENT_STATUS_VARIANT: Record<
  PaymentStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  successful: "default",
  pending: "secondary",
  refunded: "outline",
  failed: "destructive",
  abandoned: "destructive",
};

const columns: ColumnDef<PaymentRow>[] = [
  {
    id: "ref",
    header: "Payment",
    cell: ({ row }) => (
      <div className="min-w-0">
        <code className="text-muted-foreground text-xs">
          {row.original.reference}
        </code>
        <p className="truncate text-sm">{row.original.user.label}</p>
      </div>
    ),
  },
  {
    accessorKey: "provider",
    header: "Provider",
    cell: ({ row }) => (
      <span className="text-sm capitalize">{row.original.provider}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={PAYMENT_STATUS_VARIANT[row.original.status]}
        className="capitalize"
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "amount_minor",
    header: "Amount",
    cell: ({ row }) => (
      <span className="tabular-nums">
        {formatMoney(row.original.amount_minor)}
      </span>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">
        {formatDate(row.original.created_at)}
      </span>
    ),
  },
];

export function PaymentsTable() {
  const router = useRouter();
  const [{ page, per_page }, setTable] = useTableParams();
  const [{ status, provider }, setFilters] = useQueryStates(
    {
      status: parseAsStringLiteral(STATUS).withDefault("all"),
      provider: parseAsStringLiteral(PROVIDER).withDefault("all"),
    },
    { history: "push", clearOnDefault: true },
  );

  const { data, isLoading, isFetching } = usePayments({
    page,
    per_page,
    status: status === "all" ? undefined : status,
    provider: provider === "all" ? undefined : provider,
  });

  const isFiltered = status !== "all" || provider !== "all";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
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
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="successful">Successful</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="abandoned">Abandoned</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={provider}
          onValueChange={(value) => {
            void setFilters({ provider: value as (typeof PROVIDER)[number] });
            void setTable({ page: 1 });
          }}
        >
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All providers</SelectItem>
            <SelectItem value="paystack">Paystack</SelectItem>
            <SelectItem value="flutterwave">Flutterwave</SelectItem>
          </SelectContent>
        </Select>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => void setFilters({ status: "all", provider: "all" })}
          >
            Reset
          </Button>
        )}
      </div>

      <DataTable
        columns={columns}
        data={data?.items ?? []}
        isLoading={isLoading}
        onRowClick={(payment) =>
          router.push(`/dashboard/payments/${payment.id}`)
        }
        emptyMessage="No payments match these filters."
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
