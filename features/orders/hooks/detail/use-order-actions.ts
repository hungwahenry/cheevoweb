import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/api/errors";
import { cancelOrder } from "../../api/detail/cancel-order";
import { markOrderPaid } from "../../api/detail/mark-paid";
import { refundOrder } from "../../api/detail/refund-order";

export function useOrderActions(id: string) {
  const qc = useQueryClient();
  const onError = (e: unknown) => toast.error(getErrorMessage(e));
  const refresh = () => {
    void qc.invalidateQueries({ queryKey: ["order", id] });
    void qc.invalidateQueries({ queryKey: ["orders"] });
  };

  const refund = useMutation({
    mutationFn: ({ amountMinor, reason }: { amountMinor: number; reason: string }) =>
      refundOrder(id, amountMinor, reason),
    onSuccess: () => {
      toast.success("Order refunded.");
      refresh();
    },
    onError,
  });
  const cancel = useMutation({
    mutationFn: () => cancelOrder(id),
    onSuccess: () => {
      toast.success("Order cancelled.");
      refresh();
    },
    onError,
  });
  const markPaid = useMutation({
    mutationFn: () => markOrderPaid(id),
    onSuccess: () => {
      toast.success("Order marked paid.");
      refresh();
    },
    onError,
  });

  return { refund, cancel, markPaid };
}
