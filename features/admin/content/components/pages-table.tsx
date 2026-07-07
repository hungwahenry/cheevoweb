"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Plus } from "lucide-react"
import { useState } from "react"
import { ConfirmDialog } from "@/components/admin/common/confirm-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTable } from "@/components/admin/data-table/data-table"
import { formatDate } from "@/lib/format"
import { usePageMutations } from "../hooks/use-page-mutations"
import { usePages } from "../hooks/use-pages"
import type { PageValues } from "../schemas"
import type { Page } from "../types"
import { PageFormDialog } from "./page-form-dialog"

export function PagesTable() {
  const { data, isLoading } = usePages()
  const { create, update, remove, setPublished } = usePageMutations()
  const [editing, setEditing] = useState<Page | null | undefined>(undefined)
  const [deleting, setDeleting] = useState<Page | null>(null)

  function submit(values: PageValues) {
    const payload = {
      ...values,
      meta_description: values.meta_description || null,
    }
    if (editing) {
      update.mutate(
        { id: editing.id, payload },
        { onSuccess: () => setEditing(undefined) }
      )
    } else {
      create.mutate(payload, { onSuccess: () => setEditing(undefined) })
    }
  }

  const columns: ColumnDef<Page>[] = [
    {
      id: "title",
      header: "Page",
      cell: ({ row }) => (
        <div className="min-w-0">
          <p className="truncate font-medium">{row.original.title}</p>
          <code className="text-xs text-muted-foreground">
            /{row.original.slug}
          </code>
        </div>
      ),
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) =>
        row.original.is_published ? (
          <Badge variant="default">Published</Badge>
        ) : (
          <Badge variant="secondary">Draft</Badge>
        ),
    },
    {
      accessorKey: "updated_at",
      header: "Updated",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {formatDate(row.original.updated_at)}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => null,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Actions">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setEditing(row.original)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setPublished.mutate({
                    id: row.original.id,
                    published: !row.original.is_published,
                  })
                }
              >
                {row.original.is_published ? "Unpublish" : "Publish"}
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setDeleting(row.original)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setEditing(null)}>
          <Plus />
          New page
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={data ?? []}
        isLoading={isLoading}
        emptyMessage="No pages yet."
      />

      <PageFormDialog
        open={editing !== undefined}
        page={editing ?? null}
        pending={create.isPending || update.isPending}
        onOpenChange={(open) => !open && setEditing(undefined)}
        onSubmit={submit}
      />
      <ConfirmDialog
        open={deleting !== null}
        onOpenChange={(open) => !open && setDeleting(null)}
        title={`Delete ${deleting?.title ?? ""}?`}
        description="Permanently removes this page."
        pending={remove.isPending}
        onConfirm={() => {
          if (deleting) {
            remove.mutate(deleting.id, { onSuccess: () => setDeleting(null) })
          }
        }}
      />
    </div>
  )
}
