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
import { useReports } from "../hooks/use-reports";
import type { ReportRow, ReportStatus } from "../types";

const STATUS = ["all", "open", "under_review", "actioned", "dismissed"] as const;

export const REPORT_STATUS_VARIANT: Record<
  ReportStatus,
  "default" | "secondary" | "outline" | "destructive"
> = {
  open: "destructive",
  under_review: "secondary",
  actioned: "default",
  dismissed: "outline",
};

const columns: ColumnDef<ReportRow>[] = [
  {
    id: "reason",
    header: "Reason",
    cell: ({ row }) => (
      <div className="min-w-0">
        <p className="truncate font-medium">{row.original.reason.label}</p>
        <p className="text-muted-foreground truncate text-xs capitalize">
          {row.original.target?.label ??
            row.original.target_type.replace("_", " ")}
        </p>
      </div>
    ),
  },
  {
    id: "reporter",
    header: "Reporter",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.reporter.label}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={REPORT_STATUS_VARIANT[row.original.status]}
        className="capitalize"
      >
        {row.original.status.replace("_", " ")}
      </Badge>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Reported",
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">
        {formatDate(row.original.created_at)}
      </span>
    ),
  },
];

export function ReportsTable() {
  const router = useRouter();
  const [{ page, per_page }, setTable] = useTableParams();
  const [{ status }, setFilters] = useQueryStates(
    { status: parseAsStringLiteral(STATUS).withDefault("all") },
    { history: "push", clearOnDefault: true },
  );

  const { data, isLoading, isFetching } = useReports({
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
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="under_review">Under review</SelectItem>
            <SelectItem value="actioned">Actioned</SelectItem>
            <SelectItem value="dismissed">Dismissed</SelectItem>
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
        onRowClick={(report) => router.push(`/dashboard/reports/${report.id}`)}
        emptyMessage="No reports match this filter."
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
