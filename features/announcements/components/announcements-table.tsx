"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import Link from "next/link";
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
import { useAnnouncements } from "../hooks/use-announcements";
import type { AnnouncementRow, BroadcastStatus } from "../types";

const KIND = ["all", "system", "marketing"] as const;
const STATUS = [
  "all",
  "draft",
  "scheduled",
  "sending",
  "sent",
  "cancelled",
  "failed",
] as const;

export const ANNOUNCEMENT_STATUS_VARIANT: Record<
  BroadcastStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  sent: "default",
  draft: "secondary",
  sending: "secondary",
  scheduled: "outline",
  cancelled: "outline",
  failed: "destructive",
};

const columns: ColumnDef<AnnouncementRow>[] = [
  {
    id: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="min-w-0 max-w-md">
        <p className="truncate font-medium">{row.original.title}</p>
        <p className="text-muted-foreground truncate text-xs">
          {row.original.channels.join(", ")}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "kind",
    header: "Type",
    cell: ({ row }) => (
      <Badge
        variant={row.original.kind === "marketing" ? "default" : "secondary"}
        className="capitalize"
      >
        {row.original.kind}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={ANNOUNCEMENT_STATUS_VARIANT[row.original.status]}
        className="capitalize"
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "recipients_count",
    header: "Recipients",
    cell: ({ row }) => (
      <span className="text-sm tabular-nums">
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

export function AnnouncementsTable() {
  const router = useRouter();
  const [{ page, per_page }, setTable] = useTableParams();
  const [{ kind, status }, setFilters] = useQueryStates(
    {
      kind: parseAsStringLiteral(KIND).withDefault("all"),
      status: parseAsStringLiteral(STATUS).withDefault("all"),
    },
    { history: "push", clearOnDefault: true },
  );

  const { data, isLoading, isFetching } = useAnnouncements({
    page,
    per_page,
    kind: kind === "all" ? undefined : kind,
    status: status === "all" ? undefined : status,
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={kind}
            onValueChange={(value) => {
              void setFilters({ kind: value as (typeof KIND)[number] });
              void setTable({ page: 1 });
            }}
          >
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
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
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button asChild>
          <Link href="/dashboard/announcements/new">
            <Plus />
            New broadcast
          </Link>
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={data?.items ?? []}
        isLoading={isLoading}
        onRowClick={(broadcast) =>
          router.push(`/dashboard/announcements/${broadcast.id}`)
        }
        emptyMessage="No broadcasts yet."
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
