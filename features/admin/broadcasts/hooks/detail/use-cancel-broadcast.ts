import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getErrorMessage } from "@/lib/api/errors"
import { cancelBroadcast } from "../../api/detail/cancel-broadcast"

export function useCancelBroadcast(id: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: () => cancelBroadcast(id),
    onSuccess: () => {
      toast.success("Broadcast cancelled.")
      void qc.invalidateQueries({ queryKey: ["broadcast", id] })
      void qc.invalidateQueries({ queryKey: ["broadcasts"] })
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  })
}
