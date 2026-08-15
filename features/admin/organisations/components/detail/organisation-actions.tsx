"use client"

import {
  Ban,
  MinusCircle,
  PlusCircle,
  ShieldCheck,
  Trash2,
  UserCog,
} from "lucide-react"
import { useState } from "react"
import { ReasonDialog } from "@/components/admin/common/reason-dialog"
import { Button } from "@/components/ui/button"
import { useDeleteOrganisation } from "../../hooks/detail/use-delete-organisation"
import { useSuspendOrganisation } from "../../hooks/detail/use-suspend-organisation"
import { useUnsuspendOrganisation } from "../../hooks/detail/use-unsuspend-organisation"
import type { OrganisationDetail } from "../../types"
import { AdjustBalanceDialog } from "./adjust-balance-dialog"
import { ChangeOwnerDialog } from "./change-owner-dialog"

export function OrganisationActions({ org }: { org: OrganisationDetail }) {
  const [dialog, setDialog] = useState<
    null | "suspend" | "delete" | "owner" | "credit" | "debit"
  >(null)
  const suspend = useSuspendOrganisation(org.id)
  const unsuspend = useUnsuspendOrganisation(org.id)
  const remove = useDeleteOrganisation(org.id)
  const close = () => setDialog(null)

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" onClick={() => setDialog("owner")}>
        <UserCog />
        Change owner
      </Button>
      <Button variant="outline" onClick={() => setDialog("credit")}>
        <PlusCircle />
        Credit
      </Button>
      <Button variant="outline" onClick={() => setDialog("debit")}>
        <MinusCircle />
        Debit
      </Button>
      {org.suspended_at ? (
        <Button
          variant="outline"
          onClick={() => unsuspend.mutate()}
          disabled={unsuspend.isPending}
        >
          <ShieldCheck />
          Unsuspend
        </Button>
      ) : (
        <Button variant="outline" onClick={() => setDialog("suspend")}>
          <Ban />
          Suspend
        </Button>
      )}
      <Button variant="destructive" onClick={() => setDialog("delete")}>
        <Trash2 />
        Delete
      </Button>

      <ReasonDialog
        open={dialog === "suspend"}
        onOpenChange={(open) => !open && close()}
        title="Suspend organisation"
        description="Blocks the organisation and hides its events."
        confirmLabel="Suspend"
        destructive
        pending={suspend.isPending}
        onConfirm={(reason) => suspend.mutate(reason, { onSuccess: close })}
      />
      <ReasonDialog
        open={dialog === "delete"}
        onOpenChange={(open) => !open && close()}
        title={`Delete ${org.name}?`}
        description="Permanently removes the organisation and all of its events."
        confirmLabel="Delete"
        destructive
        pending={remove.isPending}
        onConfirm={(reason) => remove.mutate(reason, { onSuccess: close })}
      />
      <ChangeOwnerDialog
        orgId={org.id}
        open={dialog === "owner"}
        onOpenChange={(open) => !open && close()}
        members={org.members}
      />
      <AdjustBalanceDialog
        orgId={org.id}
        direction={dialog === "debit" ? "debit" : "credit"}
        availableMinor={org.balance.available_minor}
        onHoldMinor={org.balance.on_hold_minor}
        open={dialog === "credit" || dialog === "debit"}
        onOpenChange={(open) => !open && close()}
      />
    </div>
  )
}
