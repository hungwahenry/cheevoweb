"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { parseAsStringLiteral, useQueryStates } from "nuqs";
import { useMemo, useState } from "react";
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
import { useUsers } from "../hooks/use-users";
import type { UserRow } from "../types";

const STATUS = ["all", "active", "suspended"] as const;
const ROLE = ["all", "user", "admin"] as const;

const columns: ColumnDef<UserRow>[] = [
  {
    id: "user",
    header: "User",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarImage src={user.profile?.avatar_url} alt="" />
            <AvatarFallback>{user.email.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate font-medium">
              {user.profile?.display_name ?? user.profile?.username ?? "—"}
            </p>
            <p className="text-muted-foreground truncate text-xs">
              {user.email}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge variant={row.original.role === "admin" ? "default" : "secondary"}>
        {row.original.role}
      </Badge>
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
    id: "city",
    header: "City",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.profile?.city ?? "—"}</span>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Joined",
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">
        {formatDate(row.original.created_at)}
      </span>
    ),
  },
];

export function UsersTable() {
  const router = useRouter();
  const [{ page, per_page, q }, setTable] = useTableParams();
  const [{ status, role }, setFilters] = useQueryStates(
    {
      status: parseAsStringLiteral(STATUS).withDefault("all"),
      role: parseAsStringLiteral(ROLE).withDefault("all"),
    },
    { history: "push", clearOnDefault: true },
  );
  const [resetNonce, setResetNonce] = useState(0);

  const { data, isLoading, isFetching } = useUsers({
    page,
    per_page,
    q: q || undefined,
    suspended: status === "all" ? undefined : status === "suspended",
    role: role === "all" ? undefined : role,
  });

  const isFiltered = q !== "" || status !== "all" || role !== "all";

  function reset() {
    void setTable({ page: 1, q: "" });
    void setFilters({ status: "all", role: "all" });
    setResetNonce((value) => value + 1);
  }

  const tableData = useMemo(() => data?.items ?? [], [data]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <DataTableSearch
          key={resetNonce}
          defaultValue={q}
          placeholder="Search name or email…"
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
        <Select
          value={role}
          onValueChange={(value) => {
            void setFilters({ role: value as (typeof ROLE)[number] });
            void setTable({ page: 1 });
          }}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            <SelectItem value="user">Users</SelectItem>
            <SelectItem value="admin">Admins</SelectItem>
          </SelectContent>
        </Select>
        {isFiltered && (
          <Button variant="ghost" onClick={reset}>
            Reset
          </Button>
        )}
      </div>

      <DataTable
        columns={columns}
        data={tableData}
        isLoading={isLoading}
        onRowClick={(user) => router.push(`/dashboard/users/${user.id}`)}
        emptyMessage="No users match these filters."
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
