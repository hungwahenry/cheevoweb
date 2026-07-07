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
import { useOrganisations } from "../hooks/use-organisations";
import type { OrganisationRow } from "../types";

const STATUS = ["all", "active", "suspended"] as const;

const columns: ColumnDef<OrganisationRow>[] = [
  {
    id: "org",
    header: "Organisation",
    cell: ({ row }) => {
      const org = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-8 rounded-md">
            <AvatarImage src={org.ref.thumbnail ?? undefined} alt="" className="object-cover" />
            <AvatarFallback className="rounded-md">
              {org.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate font-medium">{org.name}</p>
            <p className="text-muted-foreground truncate text-xs">{org.slug}</p>
          </div>
        </div>
      );
    },
  },
  {
    id: "category",
    header: "Category",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.category ?? "—"}</span>
    ),
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) =>
      row.original.suspended_at ? (
        <Badge variant="destructive">Suspended</Badge>
      ) : (
        <Badge variant="outline">Active</Badge>
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

export function OrganisationsTable() {
  const router = useRouter();
  const [{ page, per_page, q }, setTable] = useTableParams();
  const [{ status }, setFilters] = useQueryStates(
    { status: parseAsStringLiteral(STATUS).withDefault("all") },
    { history: "push", clearOnDefault: true },
  );

  const { data, isLoading, isFetching } = useOrganisations({
    page,
    per_page,
    q: q || undefined,
    suspended: status === "all" ? undefined : status === "suspended",
  });

  const isFiltered = q !== "" || status !== "all";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <DataTableSearch
          defaultValue={q}
          placeholder="Search name or slug…"
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
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
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
        onRowClick={(org) => router.push(`/dashboard/organisations/${org.id}`)}
        emptyMessage="No organisations match these filters."
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
