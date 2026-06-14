"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { parseAsStringLiteral, useQueryStates } from "nuqs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { DataTableSearch } from "@/components/data-table/data-table-search";
import { useTableParams } from "@/lib/table/use-table-params";
import { formatDate } from "@/lib/format";
import { useEvents } from "../hooks/use-events";
import type { EventRow, EventStatus } from "../types";

const STATUS = ["all", "draft", "published", "past"] as const;

const STATUS_VARIANT: Record<EventStatus, "default" | "secondary" | "outline"> =
  {
    published: "default",
    draft: "secondary",
    past: "outline",
  };

const columns: ColumnDef<EventRow>[] = [
  {
    id: "event",
    header: "Event",
    cell: ({ row }) => {
      const event = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-8 rounded-md">
            <AvatarImage
              src={event.ref.thumbnail ?? undefined}
              alt=""
              className="object-cover"
            />
            <AvatarFallback className="rounded-md">
              {event.title.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate font-medium">{event.title}</p>
            <p className="text-muted-foreground truncate text-xs">
              {event.organisation.label}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={STATUS_VARIANT[row.original.status]} className="capitalize">
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "starts_at",
    header: "Starts",
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">
        {formatDate(row.original.starts_at)}
      </span>
    ),
  },
];

export function EventsTable() {
  const router = useRouter();
  const [{ page, per_page, q }, setTable] = useTableParams();
  const [{ status }, setFilters] = useQueryStates(
    { status: parseAsStringLiteral(STATUS).withDefault("all") },
    { history: "push", clearOnDefault: true },
  );

  const { data, isLoading, isFetching } = useEvents({
    page,
    per_page,
    q: q || undefined,
    status: status === "all" ? undefined : status,
  });

  const isFiltered = q !== "" || status !== "all";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <DataTableSearch
          defaultValue={q}
          placeholder="Search title…"
          onSearch={(value) => void setTable({ q: value, page: 1 })}
        />
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
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="past">Past</SelectItem>
          </SelectContent>
        </Select>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              void setTable({ q: "", page: 1 });
              void setFilters({ status: "all" });
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
        onRowClick={(event) => router.push(`/dashboard/events/${event.id}`)}
        emptyMessage="No events match these filters."
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
