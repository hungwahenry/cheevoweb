import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getErrorMessage } from "@/lib/api/errors"
import { markPaymentSuccess } from "../../api/detail/mark-success"
import { resyncPayment } from "../../api/detail/resync-payment"

export function usePaymentActions(id: string) {
  const qc = useQueryClient()
  const onError = (e: unknown) => toast.error(getErrorMessage(e))
  const refresh = () => {
    void qc.invalidateQueries({ queryKey: ["payment", id] })
    void qc.invalidateQueries({ queryKey: ["payments"] })
  }

  const resync = useMutation({
    mutationFn: () => resyncPayment(id),
    onSuccess: () => {
      toast.success("Payment re-synced with provider.")
      refresh()
    },
    onError,
  })
  const markSuccess = useMutation({
    mutationFn: () => markPaymentSuccess(id),
    onSuccess: () => {
      toast.success("Payment marked successful.")
      refresh()
    },
    onError,
  })

  return { resync, markSuccess }
}
