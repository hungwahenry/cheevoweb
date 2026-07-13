import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getErrorMessage } from "@/lib/api/errors"
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

  return { retry }
}
