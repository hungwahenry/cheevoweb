"use client";

import { Ban } from "lucide-react";
import { AuditTrail } from "@/components/common/audit-trail";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { DetailHeader } from "@/components/common/detail-header";
import { DetailSection, Empty } from "@/components/common/detail-section";
import { EntityRefItem } from "@/components/common/entity-ref";
import { StatGrid } from "@/components/common/stat-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useBroadcast } from "../../hooks/detail/use-broadcast";
import { useCancelBroadcast } from "../../hooks/detail/use-cancel-broadcast";
import { BROADCAST_STATUS_VARIANT } from "../broadcasts-table";

export function BroadcastDetail({ id }: { id: string }) {
  const { data: broadcast, isLoading, isError } = useBroadcast(id);
  const [cancelOpen, setCancelOpen] = useState(false);
  const cancel = useCancelBroadcast(id);

  if (isLoading) return <Skeleton className="h-40 w-full" />;
  if (isError || !broadcast) {
    return <Empty>This broadcast could not be loaded.</Empty>;
  }

  const cancellable =
    broadcast.status === "queued" || broadcast.status === "sending";

  return (
    <div className="space-y-6">
      <DetailHeader
        title={broadcast.subject}
        subtitle={`${broadcast.organisation.label} · ${broadcast.event.label}`}
        badges={
          <Badge
            variant={BROADCAST_STATUS_VARIANT[broadcast.status]}
            className="capitalize"
          >
            {broadcast.status}
          </Badge>
        }
        actions={
          cancellable ? (
            <Button variant="destructive" onClick={() => setCancelOpen(true)}>
              <Ban />
              Cancel
            </Button>
          ) : undefined
        }
      />

      {broadcast.failure_reason && (
        <Card className="border-destructive/40">
          <CardContent className="text-sm">
            <span className="font-medium">Failed:</span>{" "}
            {broadcast.failure_reason}
          </CardContent>
        </Card>
      )}

      <StatGrid
        stats={[
          { label: "Recipients", value: broadcast.recipients_count.toLocaleString() },
          { label: "Sent", value: broadcast.sent_count.toLocaleString() },
          { label: "Failed", value: broadcast.failed_count.toLocaleString() },
          { label: "Audience", value: <span className="text-sm capitalize">{broadcast.audience}</span> },
        ]}
      />

      <DetailSection title="Sent by">
        <EntityRefItem entity={broadcast.created_by} />
      </DetailSection>

      <DetailSection title="Message">
        <p className="text-sm whitespace-pre-wrap">{broadcast.body_text}</p>
      </DetailSection>

      <DetailSection title="Admin activity">
        <AuditTrail entries={broadcast.audit_trail} />
      </DetailSection>

      <ConfirmDialog
        open={cancelOpen}
        onOpenChange={setCancelOpen}
        title="Cancel this broadcast?"
        description="Stops any remaining sends. Already-sent emails can't be recalled."
        confirmLabel="Cancel broadcast"
        pending={cancel.isPending}
        onConfirm={() =>
          cancel.mutate(undefined, { onSuccess: () => setCancelOpen(false) })
        }
      />
    </div>
  );
}
