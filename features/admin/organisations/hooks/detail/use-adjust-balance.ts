import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getErrorMessage } from "@/lib/api/errors"
import { adjustBalance, type AdjustBalanceInput } from "../../api/detail/adjust-balance"

export function useAdjustBalance(id: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: AdjustBalanceInput) => adjustBalance(id, input),
    onSuccess: (_data, input) => {
      toast.success(
        input.direction === "credit" ? "Balance credited." : "Balance debited."
      )
      void qc.invalidateQueries({ queryKey: ["organisation", id] })
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  })
}
