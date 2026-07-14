import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getErrorMessage } from "@/lib/api/errors"
import { approvePayout } from "../../api/detail/approve-payout"
import { rejectPayout } from "../../api/detail/reject-payout"
import { retryPayout } from "../../api/detail/retry-payout"

export function usePayoutActions(id: string) {
  const qc = useQueryClient()
  const onError = (e: unknown) => toast.error(getErrorMessage(e))
  const refresh = () => {
    void qc.invalidateQueries({ queryKey: ["payout", id] })
    void qc.invalidateQueries({ queryKey: ["payouts"] })
  }

  const retry = useMutation({
    mutationFn: () => retryPayout(id),
    onSuccess: () => {
      toast.success("Payout transfer re-initiated.")
      refresh()
    },
    onError,
  })

  const approve = useMutation({
    mutationFn: () => approvePayout(id),
    onSuccess: () => {
      toast.success("Payout approved.")
      refresh()
    },
    onError,
  })

  const reject = useMutation({
    mutationFn: (notes?: string) => rejectPayout(id, notes),
    onSuccess: () => {
      toast.success("Payout rejected.")
      refresh()
    },
    onError,
  })

  return { retry, approve, reject }
}
