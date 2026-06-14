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
import { formatDate } from "@/lib/format";
import { useBroadcasts } from "../hooks/use-broadcasts";
import type { BroadcastRow, BroadcastStatus } from "../types";

const STATUS = ["all", "queued", "sending", "sent", "failed", "cancelled"] as const;

export const BROADCAST_STATUS_VARIANT: Record<
  BroadcastStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  sent: "default",
  queued: "secondary",
  sending: "secondary",
  cancelled: "outline",
  failed: "destructive",
};

const columns: ColumnDef<BroadcastRow>[] = [
  {
    id: "subject",
    header: "Broadcast",
    cell: ({ row }) => (
      <div className="min-w-0 max-w-md">
        <p className="truncate font-medium">{row.original.subject}</p>
        <p className="text-muted-foreground truncate text-xs">
          {row.original.organisation.label} · {row.original.event.label}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={BROADCAST_STATUS_VARIANT[row.original.status]}
        className="capitalize"
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "recipients",
    header: "Sent",
    cell: ({ row }) => (
      <span className="text-sm tabular-nums">
        {row.original.sent_count.toLocaleString()} /{" "}
        {row.original.recipients_count.toLocaleString()}
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

export function BroadcastsTable() {
  const router = useRouter();
  const [{ page, per_page }, setTable] = useTableParams();
  const [{ status }, setFilters] = useQueryStates(
    { status: parseAsStringLiteral(STATUS).withDefault("all") },
    { history: "push", clearOnDefault: true },
  );

  const { data, isLoading, isFetching } = useBroadcasts({
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
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="queued">Queued</SelectItem>
            <SelectItem value="sending">Sending</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
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
        onRowClick={(broadcast) =>
          router.push(`/dashboard/broadcasts/${broadcast.id}`)
        }
        emptyMessage="No broadcasts match this filter."
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
