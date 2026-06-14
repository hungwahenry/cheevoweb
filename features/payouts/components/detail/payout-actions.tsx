"use client";

import { CheckCircle2, RefreshCw, ThumbsUp, XCircle } from "lucide-react";
import { useState } from "react";
import { ReasonDialog } from "@/components/common/reason-dialog";
import { Button } from "@/components/ui/button";
import { usePayoutActions } from "../../hooks/detail/use-payout-actions";
import type { Payout } from "../../types";
import { ApprovePayoutDialog } from "./approve-payout-dialog";

export function PayoutActions({ payout }: { payout: Payout }) {
  const [dialog, setDialog] = useState<null | "approve" | "reject" | "paid">(
    null,
  );
  const { reject, markPaid, retry } = usePayoutActions(payout.id);
  const close = () => setDialog(null);
  const { status } = payout;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {status === "requested" && (
        <>
          <Button variant="outline" onClick={() => setDialog("approve")}>
            <ThumbsUp />
            Approve
          </Button>
          <Button variant="destructive" onClick={() => setDialog("reject")}>
            <XCircle />
            Reject
          </Button>
        </>
      )}
      {(status === "approved" || status === "processing") && (
        <Button variant="outline" onClick={() => setDialog("paid")}>
          <CheckCircle2 />
          Mark paid
        </Button>
      )}
      {(status === "approved" ||
        status === "processing" ||
        status === "failed") && (
        <Button
          variant="outline"
          onClick={() => retry.mutate()}
          disabled={retry.isPending}
        >
          <RefreshCw />
          Retry transfer
        </Button>
      )}

      <ApprovePayoutDialog
        payoutId={payout.id}
        open={dialog === "approve"}
        onOpenChange={(open) => !open && close()}
      />
      <ReasonDialog
        open={dialog === "reject"}
        onOpenChange={(open) => !open && close()}
        title="Reject payout"
        confirmLabel="Reject"
        destructive
        pending={reject.isPending}
        onConfirm={(note) => reject.mutate(note, { onSuccess: close })}
      />
      <ReasonDialog
        open={dialog === "paid"}
        onOpenChange={(open) => !open && close()}
        title="Mark payout as paid"
        description="Record that the funds were settled manually."
        confirmLabel="Mark paid"
        pending={markPaid.isPending}
        onConfirm={(note) => markPaid.mutate(note, { onSuccess: close })}
      />
    </div>
  );
}
