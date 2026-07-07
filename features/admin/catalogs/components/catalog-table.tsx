"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/admin/data-table/data-table"

interface CatalogTableProps<T> {
  singular: string
  columns: ColumnDef<T, unknown>[]
  data: T[]
  isLoading?: boolean
  onAdd: () => void
  onEdit: (row: T) => void
  onDelete: (row: T) => void
}

export function CatalogTable<T>({
  singular,
  columns,
  data,
  isLoading,
  onAdd,
  onEdit,
  onDelete,
}: CatalogTableProps<T>) {
  const withActions: ColumnDef<T, unknown>[] = [
    ...columns,
    {
      id: "actions",
      header: () => null,
      cell: ({ row }) => (
        <div className="flex justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Edit"
            onClick={() => onEdit(row.original)}
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Delete"
            onClick={() => onDelete(row.original)}
          >
            <Trash2 className="size-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={onAdd}>
          <Plus />
          Add {singular.toLowerCase()}
        </Button>
      </div>
      <DataTable
        columns={withActions}
        data={data}
        isLoading={isLoading}
        emptyMessage={`No ${singular.toLowerCase()}s yet.`}
      />
    </div>
  )
}
