"use client";

import { Gavel, PlayCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { ReasonDialog } from "@/components/common/reason-dialog";
import { Button } from "@/components/ui/button";
import { useReportActions } from "../../hooks/detail/use-report-actions";
import type { ReportDetail } from "../../types";
import { ActionReportDialog } from "./action-report-dialog";

export function ReportActions({ report }: { report: ReportDetail }) {
  const [dialog, setDialog] = useState<null | "action" | "dismiss">(null);
  const { review, action, dismiss } = useReportActions(report.id);
  const close = () => setDialog(null);
  const isResolved =
    report.status === "actioned" || report.status === "dismissed";

  if (isResolved) {
    return (
      <span className="text-muted-foreground text-sm">
        Resolved {report.status === "actioned" ? "(actioned)" : "(dismissed)"}
      </span>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {report.status === "open" && (
        <Button
          variant="outline"
          onClick={() => review.mutate()}
          disabled={review.isPending}
        >
          <PlayCircle />
          Start review
        </Button>
      )}
      <Button onClick={() => setDialog("action")}>
        <Gavel />
        Resolve
      </Button>
      <Button variant="outline" onClick={() => setDialog("dismiss")}>
        <XCircle />
        Dismiss
      </Button>

      <ActionReportDialog
        open={dialog === "action"}
        onOpenChange={(open) => !open && close()}
        pending={action.isPending}
        onSubmit={(outcome, note) =>
          action.mutate(
            { action: outcome, note },
            { onSuccess: close },
          )
        }
      />
      <ReasonDialog
        open={dialog === "dismiss"}
        onOpenChange={(open) => !open && close()}
        title="Dismiss report"
        confirmLabel="Dismiss"
        pending={dismiss.isPending}
        onConfirm={(note) => dismiss.mutate(note, { onSuccess: close })}
      />
    </div>
  );
}
