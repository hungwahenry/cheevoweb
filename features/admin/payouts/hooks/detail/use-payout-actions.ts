import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/api/errors";
import { approvePayout } from "../../api/detail/approve-payout";
import { markPayoutPaid } from "../../api/detail/mark-paid";
import { rejectPayout } from "../../api/detail/reject-payout";
import { retryPayout } from "../../api/detail/retry-payout";

export function usePayoutActions(id: string) {
  const qc = useQueryClient();
  const onError = (e: unknown) => toast.error(getErrorMessage(e));
  const refresh = () => {
    void qc.invalidateQueries({ queryKey: ["payout", id] });
    void qc.invalidateQueries({ queryKey: ["payouts"] });
  };

  const approve = useMutation({
    mutationFn: ({ method, note }: { method: "provider" | "manual"; note?: string }) =>
      approvePayout(id, method, note),
    onSuccess: () => {
      toast.success("Payout approved.");
      refresh();
    },
    onError,
  });
  const reject = useMutation({
    mutationFn: (note: string) => rejectPayout(id, note),
    onSuccess: () => {
      toast.success("Payout rejected.");
      refresh();
    },
    onError,
  });
  const markPaid = useMutation({
    mutationFn: (note: string) => markPayoutPaid(id, note),
    onSuccess: () => {
      toast.success("Payout marked paid.");
      refresh();
    },
    onError,
  });
  const retry = useMutation({
    mutationFn: () => retryPayout(id),
    onSuccess: () => {
      toast.success("Payout transfer re-initiated.");
      refresh();
    },
    onError,
  });

  return { approve, reject, markPaid, retry };
}
