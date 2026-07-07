"use client"

import { Ban, KeyRound, ShieldCheck } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRevokeSessions } from "../../hooks/detail/use-revoke-sessions"
import { useUnsuspendUser } from "../../hooks/detail/use-unsuspend-user"
import type { UserDetail } from "../../types"
import { SuspendUserDialog } from "./suspend-user-dialog"

export function UserActions({ user }: { user: UserDetail }) {
  const [suspendOpen, setSuspendOpen] = useState(false)
  const unsuspend = useUnsuspendUser(user.id)
  const revoke = useRevokeSessions(user.id)

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        onClick={() => revoke.mutate()}
        disabled={revoke.isPending}
      >
        <KeyRound />
        Revoke sessions
      </Button>
      {user.suspended_at ? (
        <Button
          variant="outline"
          onClick={() => unsuspend.mutate()}
          disabled={unsuspend.isPending}
        >
          <ShieldCheck />
          Unsuspend
        </Button>
      ) : (
        <Button variant="destructive" onClick={() => setSuspendOpen(true)}>
          <Ban />
          Suspend
        </Button>
      )}
      <SuspendUserDialog
        userId={user.id}
        open={suspendOpen}
        onOpenChange={setSuspendOpen}
      />
    </div>
  )
}
