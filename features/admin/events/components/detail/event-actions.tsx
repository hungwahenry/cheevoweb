"use client"

import { EyeOff, Lock, LockOpen, Trash2, History } from "lucide-react"
import { useState } from "react"
import { ReasonDialog } from "@/components/admin/common/reason-dialog"
import { Button } from "@/components/ui/button"
import { useEventActions } from "../../hooks/detail/use-event-actions"
import type { EventDetail } from "../../types"

export function EventActions({ event }: { event: EventDetail }) {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const actions = useEventActions(event.id)

  return (
    <div className="flex flex-wrap items-center gap-2">
      {event.status === "published" && (
        <Button
          variant="outline"
          onClick={() => actions.unpublish.mutate()}
          disabled={actions.unpublish.isPending}
        >
          <EyeOff />
          Unpublish
        </Button>
      )}
      {event.status !== "past" && (
        <Button
          variant="outline"
          onClick={() => actions.markPast.mutate()}
          disabled={actions.markPast.isPending}
        >
          <History />
          Mark past
        </Button>
      )}
      {event.comments_locked_at ? (
        <Button
          variant="outline"
          onClick={() => actions.unlockComments.mutate()}
          disabled={actions.unlockComments.isPending}
        >
          <LockOpen />
          Unlock comments
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={() => actions.lockComments.mutate()}
          disabled={actions.lockComments.isPending}
        >
          <Lock />
          Lock comments
        </Button>
      )}
      <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
        <Trash2 />
        Delete
      </Button>

      <ReasonDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title={`Delete ${event.title}?`}
        description="Permanently removes the event, its orders and tickets."
        confirmLabel="Delete"
        destructive
        pending={actions.remove.isPending}
        onConfirm={(reason) =>
          actions.remove.mutate(reason, {
            onSuccess: () => setDeleteOpen(false),
          })
        }
      />
    </div>
  )
}
