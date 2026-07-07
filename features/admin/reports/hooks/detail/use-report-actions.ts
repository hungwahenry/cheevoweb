import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getErrorMessage } from "@/lib/api/errors"
import { actionReport } from "../../api/detail/action-report"
import { dismissReport } from "../../api/detail/dismiss-report"
import { startReview } from "../../api/detail/start-review"
import type { ReportAction } from "../../types"

export function useReportActions(id: string) {
  const qc = useQueryClient()
  const onError = (e: unknown) => toast.error(getErrorMessage(e))
  const refresh = () => {
    void qc.invalidateQueries({ queryKey: ["report", id] })
    void qc.invalidateQueries({ queryKey: ["reports"] })
  }

  const review = useMutation({
    mutationFn: () => startReview(id),
    onSuccess: () => {
      toast.success("Review started.")
      refresh()
    },
    onError,
  })
  const action = useMutation({
    mutationFn: ({ action, note }: { action: ReportAction; note: string }) =>
      actionReport(id, action, note),
    onSuccess: () => {
      toast.success("Report actioned.")
      refresh()
    },
    onError,
  })
  const dismiss = useMutation({
    mutationFn: (note: string) => dismissReport(id, note),
    onSuccess: () => {
      toast.success("Report dismissed.")
      refresh()
    },
    onError,
  })

  return { review, action, dismiss }
}
