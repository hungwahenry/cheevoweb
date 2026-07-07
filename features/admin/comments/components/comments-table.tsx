"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { Flag, MoreHorizontal } from "lucide-react"
import { parseAsBoolean, useQueryState } from "nuqs"
import { useState } from "react"
import { ReasonDialog } from "@/components/admin/common/reason-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { DataTable } from "@/components/admin/data-table/data-table"
import { DataTablePagination } from "@/components/admin/data-table/data-table-pagination"
import { useTableParams } from "@/lib/table/use-table-params"
import { formatDate } from "@/lib/format"
import { useCommentActions } from "../hooks/use-comment-actions"
import { useComments } from "../hooks/use-comments"
import type { Comment } from "../types"

export function CommentsTable() {
  const [{ page, per_page }, setTable] = useTableParams()
  const [flaggedOnly, setFlaggedOnly] = useQueryState(
    "flagged",
    parseAsBoolean.withDefault(false)
  )
  const [deleting, setDeleting] = useState<Comment | null>(null)
  const actions = useCommentActions()

  const { data, isLoading, isFetching } = useComments({
    page,
    per_page,
    flagged_only: flaggedOnly || undefined,
  })

  const columns: ColumnDef<Comment>[] = [
    {
      id: "comment",
      header: "Comment",
      cell: ({ row }) => (
        <div className="max-w-md min-w-0">
          <p className="truncate text-sm">
            {row.original.body ?? (row.original.gif ? "[GIF]" : "—")}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {row.original.author.label} · {row.original.event.label}
          </p>
        </div>
      ),
    },
    {
      id: "flags",
      header: "Flags",
      cell: ({ row }) =>
        row.original.flags_count > 0 ? (
          <Badge variant="destructive" className="gap-1">
            <Flag className="size-3" />
            {row.original.flags_count}
          </Badge>
        ) : (
          <span className="text-sm text-muted-foreground">—</span>
        ),
    },
    {
      accessorKey: "created_at",
      header: "Posted",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {formatDate(row.original.created_at)}
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
              {row.original.flags_count > 0 && (
                <DropdownMenuItem
                  onClick={() => actions.dismiss.mutate(row.original.id)}
                >
                  Dismiss flags
                </DropdownMenuItem>
              )}
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
      <label className="flex w-fit items-center gap-2 text-sm">
        <Switch
          checked={flaggedOnly}
          onCheckedChange={(checked) => {
            void setFlaggedOnly(checked)
            void setTable({ page: 1 })
          }}
        />
        Flagged only
      </label>

      <DataTable
        columns={columns}
        data={data?.items ?? []}
        isLoading={isLoading}
        emptyMessage="No comments match this filter."
      />

      <DataTablePagination
        page={page}
        lastPage={data?.last_page ?? 1}
        total={data?.total ?? 0}
        onPageChange={(next) => void setTable({ page: next })}
        isLoading={isFetching}
      />

      <ReasonDialog
        open={deleting !== null}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Delete comment"
        description="Removes the comment for everyone. The reason is logged."
        confirmLabel="Delete"
        destructive
        pending={actions.remove.isPending}
        onConfirm={(reason) => {
          if (deleting) {
            actions.remove.mutate(
              { id: deleting.id, reason },
              { onSuccess: () => setDeleting(null) }
            )
          }
        }}
      />
    </div>
  )
}
