import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/api/errors";
import { cancelAnnouncement } from "../../api/detail/cancel-announcement";
import { deleteAnnouncement } from "../../api/detail/delete-announcement";
import { scheduleAnnouncement } from "../../api/detail/schedule-announcement";
import { sendAnnouncement } from "../../api/detail/send-announcement";
import { updateAnnouncement } from "../../api/detail/update-announcement";
import type { BroadcastInput } from "../../types";

export function useAnnouncementActions(id: string) {
  const qc = useQueryClient();
  const router = useRouter();
  const onError = (e: unknown) => toast.error(getErrorMessage(e));
  const refresh = () => {
    void qc.invalidateQueries({ queryKey: ["announcement", id] });
    void qc.invalidateQueries({ queryKey: ["announcements"] });
  };

  const update = useMutation({
    mutationFn: (input: BroadcastInput) => updateAnnouncement(id, input),
    onSuccess: () => {
      toast.success("Draft updated.");
      refresh();
    },
    onError,
  });
  const send = useMutation({
    mutationFn: () => sendAnnouncement(id),
    onSuccess: () => {
      toast.success("Broadcast sent.");
      refresh();
    },
    onError,
  });
  const schedule = useMutation({
    mutationFn: (scheduledAt: string) => scheduleAnnouncement(id, scheduledAt),
    onSuccess: () => {
      toast.success("Broadcast scheduled.");
      refresh();
    },
    onError,
  });
  const cancel = useMutation({
    mutationFn: () => cancelAnnouncement(id),
    onSuccess: () => {
      toast.success("Broadcast cancelled.");
      refresh();
    },
    onError,
  });
  const remove = useMutation({
    mutationFn: () => deleteAnnouncement(id),
    onSuccess: () => {
      toast.success("Draft deleted.");
      void qc.invalidateQueries({ queryKey: ["announcements"] });
      router.replace("/dashboard/announcements");
    },
    onError,
  });

  return { update, send, schedule, cancel, remove };
}
