"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { Pencil, RotateCcw } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/admin/data-table/data-table"
import { useConfigMutations } from "../hooks/use-config-mutations"
import { useConfigs } from "../hooks/use-configs"
import type { SystemConfig } from "../types"
import { ConfigEditDialog } from "./config-edit-dialog"

function display(value: unknown): string {
  if (value === null || value === undefined) return "—"
  if (typeof value === "boolean") return value ? "true" : "false"
  return String(value)
}

export function ConfigsTable() {
  const { data, isLoading } = useConfigs()
  const { reset } = useConfigMutations()
  const [editing, setEditing] = useState<SystemConfig | null>(null)

  const columns: ColumnDef<SystemConfig>[] = [
    {
      id: "config",
      header: "Setting",
      cell: ({ row }) => (
        <div className="max-w-sm min-w-0">
          <code className="text-sm font-medium">{row.original.key}</code>
          <p className="truncate text-xs text-muted-foreground">
            {row.original.description}
          </p>
        </div>
      ),
    },
    {
      id: "group",
      header: "Group",
      cell: ({ row }) => (
        <Badge variant="secondary">{row.original.group}</Badge>
      ),
    },
    {
      id: "value",
      header: "Value",
      cell: ({ row }) => (
        <span className="text-sm tabular-nums">
          {display(row.original.value)}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => null,
      cell: ({ row }) => (
        <div className="flex justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Edit"
            onClick={() => setEditing(row.original)}
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Reset to default"
            onClick={() => reset.mutate(row.original.id)}
          >
            <RotateCcw className="size-4" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <>
      <DataTable
        columns={columns}
        data={data ?? []}
        isLoading={isLoading}
        emptyMessage="No system configs."
      />
      <ConfigEditDialog
        key={editing?.id ?? "none"}
        config={editing}
        onOpenChange={(open) => !open && setEditing(null)}
      />
    </>
  )
}
