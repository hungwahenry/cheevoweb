"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DataTable } from "@/components/data-table/data-table";
import { useFlags } from "../hooks/use-flags";
import { useUpdateFlag } from "../hooks/use-update-flag";
import type { FeatureFlag } from "../types";
import { FlagEditDialog } from "./flag-edit-dialog";

export function FlagsTable() {
  const { data, isLoading } = useFlags();
  const update = useUpdateFlag();
  const [editing, setEditing] = useState<FeatureFlag | null>(null);

  const columns: ColumnDef<FeatureFlag>[] = [
    {
      id: "flag",
      header: "Flag",
      cell: ({ row }) => (
        <div className="min-w-0 max-w-md">
          <code className="text-sm font-medium">{row.original.key}</code>
          <p className="text-muted-foreground truncate text-xs">
            {row.original.description}
          </p>
        </div>
      ),
    },
    {
      id: "enabled",
      header: "Enabled",
      cell: ({ row }) => (
        <Switch
          checked={row.original.enabled}
          onCheckedChange={(checked) =>
            update.mutate({
              id: row.original.id,
              payload: { enabled: checked },
            })
          }
        />
      ),
    },
    {
      accessorKey: "rollout_pct",
      header: "Rollout",
      cell: ({ row }) => (
        <span className="text-sm tabular-nums">{row.original.rollout_pct}%</span>
      ),
    },
    {
      id: "public",
      header: "Visibility",
      cell: ({ row }) =>
        row.original.is_public ? (
          <Badge variant="outline">Public</Badge>
        ) : (
          <Badge variant="secondary">Internal</Badge>
        ),
    },
    {
      id: "actions",
      header: () => null,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Edit"
            onClick={() => setEditing(row.original)}
          >
            <Pencil className="size-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        data={data ?? []}
        isLoading={isLoading}
        emptyMessage="No feature flags."
      />
      <FlagEditDialog
        flag={editing}
        onOpenChange={(open) => !open && setEditing(null)}
      />
    </>
  );
}
