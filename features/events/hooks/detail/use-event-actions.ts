import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/api/errors";
import { deleteEvent } from "../../api/detail/delete-event";
import { lockEventComments } from "../../api/detail/lock-comments";
import { markPastEvent } from "../../api/detail/mark-past";
import { unlockEventComments } from "../../api/detail/unlock-comments";
import { unpublishEvent } from "../../api/detail/unpublish";

export function useEventActions(id: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const onError = (error: unknown) => toast.error(getErrorMessage(error));
  const refresh = () => {
    void queryClient.invalidateQueries({ queryKey: ["event", id] });
    void queryClient.invalidateQueries({ queryKey: ["events"] });
  };
  const success = (message: string) => () => {
    toast.success(message);
    refresh();
  };

  const unpublish = useMutation({
    mutationFn: () => unpublishEvent(id),
    onSuccess: success("Event unpublished."),
    onError,
  });
  const markPast = useMutation({
    mutationFn: () => markPastEvent(id),
    onSuccess: success("Event marked as past."),
    onError,
  });
  const lockComments = useMutation({
    mutationFn: () => lockEventComments(id),
    onSuccess: success("Comments locked."),
    onError,
  });
  const unlockComments = useMutation({
    mutationFn: () => unlockEventComments(id),
    onSuccess: success("Comments unlocked."),
    onError,
  });
  const remove = useMutation({
    mutationFn: (reason: string) => deleteEvent(id, reason),
    onSuccess: () => {
      toast.success("Event deleted.");
      void queryClient.invalidateQueries({ queryKey: ["events"] });
      router.replace("/dashboard/events");
    },
    onError,
  });

  return { unpublish, markPast, lockComments, unlockComments, remove };
}
