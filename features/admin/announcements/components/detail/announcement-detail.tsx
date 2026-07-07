"use client";

import { Ban, CalendarClock, Send, Trash2 } from "lucide-react";
import { useState } from "react";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { DetailHeader } from "@/components/common/detail-header";
import { Empty } from "@/components/common/detail-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateTime } from "@/lib/format";
import { useAnnouncement } from "../../hooks/detail/use-announcement";
import { useAnnouncementActions } from "../../hooks/detail/use-announcement-actions";
import { BroadcastComposer } from "../broadcast-composer";
import { ANNOUNCEMENT_STATUS_VARIANT } from "../announcements-table";
import { BroadcastStats } from "./broadcast-stats";
import { ScheduleDialog } from "./schedule-dialog";

export function AnnouncementDetail({ id }: { id: string }) {
  const { data: broadcast, isLoading, isError } = useAnnouncement(id);
  const actions = useAnnouncementActions(id);
  const [dialog, setDialog] = useState<null | "send" | "schedule" | "delete">(
    null,
  );

  if (isLoading) return <Skeleton className="h-40 w-full" />;
  if (isError || !broadcast) {
    return <Empty>This broadcast could not be loaded.</Empty>;
  }

  const isDraft = broadcast.status === "draft";
  const isScheduled = broadcast.status === "scheduled";
  const close = () => setDialog(null);

  return (
    <div className="space-y-6">
      <DetailHeader
        title={broadcast.title}
        subtitle={`${broadcast.kind} · ${broadcast.channels.join(", ")}`}
        badges={
          <Badge
            variant={ANNOUNCEMENT_STATUS_VARIANT[broadcast.status]}
            className="capitalize"
          >
            {broadcast.status}
          </Badge>
        }
        actions={
          isDraft ? (
            <div className="flex flex-wrap items-center gap-2">
              <Button onClick={() => setDialog("send")}>
                <Send />
                Send now
              </Button>
              <Button variant="outline" onClick={() => setDialog("schedule")}>
                <CalendarClock />
                Schedule
              </Button>
              <Button variant="ghost" onClick={() => setDialog("delete")}>
                <Trash2 />
                Delete
              </Button>
            </div>
          ) : isScheduled ? (
            <Button
              variant="destructive"
              onClick={() => actions.cancel.mutate()}
              disabled={actions.cancel.isPending}
            >
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

      {isScheduled && broadcast.scheduled_at && (
        <Card>
          <CardContent className="text-sm">
            Scheduled for{" "}
            <span className="font-medium">
              {formatDateTime(broadcast.scheduled_at)}
            </span>
            .
          </CardContent>
        </Card>
      )}

      {isDraft ? (
        <BroadcastComposer
          initial={{
            kind: broadcast.kind,
            title: broadcast.title,
            body: broadcast.body,
            channels: broadcast.channels,
            audience: broadcast.audience,
          }}
          submitLabel="Update draft"
          pending={actions.update.isPending}
          onSubmit={(input) => actions.update.mutate(input)}
        />
      ) : (
        <BroadcastStats broadcast={broadcast} />
      )}

      <ConfirmDialog
        open={dialog === "send"}
        onOpenChange={(open) => !open && close()}
        title="Send this broadcast now?"
        description="It will be delivered immediately and can't be unsent."
        confirmLabel="Send now"
        destructive={false}
        pending={actions.send.isPending}
        onConfirm={() => actions.send.mutate(undefined, { onSuccess: close })}
      />
      <ScheduleDialog
        open={dialog === "schedule"}
        onOpenChange={(open) => !open && close()}
        pending={actions.schedule.isPending}
        onConfirm={(iso) =>
          actions.schedule.mutate(iso, { onSuccess: close })
        }
      />
      <ConfirmDialog
        open={dialog === "delete"}
        onOpenChange={(open) => !open && close()}
        title="Delete this draft?"
        pending={actions.remove.isPending}
        onConfirm={() => actions.remove.mutate(undefined, { onSuccess: close })}
      />
    </div>
  );
}
