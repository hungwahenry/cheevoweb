import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/api/errors";
import { reissueTicket } from "../api/reissue-ticket";
import { revokeTicket } from "../api/revoke-ticket";
import { transferTicket } from "../api/transfer-ticket";

export function useTicketActions() {
  const qc = useQueryClient();
  const onError = (e: unknown) => toast.error(getErrorMessage(e));
  const refresh = () =>
    void qc.invalidateQueries({ queryKey: ["issued-tickets"] });

  const revoke = useMutation({
    mutationFn: (id: string) => revokeTicket(id),
    onSuccess: () => {
      toast.success("Ticket revoked.");
      refresh();
    },
    onError,
  });
  const reissue = useMutation({
    mutationFn: (id: string) => reissueTicket(id),
    onSuccess: () => {
      toast.success("Ticket reissued with a new code.");
      refresh();
    },
    onError,
  });
  const transfer = useMutation({
    mutationFn: ({ id, toUserId, reason }: { id: string; toUserId: string; reason?: string }) =>
      transferTicket(id, toUserId, reason),
    onSuccess: () => {
      toast.success("Ticket transferred.");
      refresh();
    },
    onError,
  });

  return { revoke, reissue, transfer };
}
