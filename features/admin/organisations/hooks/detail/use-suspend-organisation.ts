import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getErrorMessage } from "@/lib/api/errors"
import { suspendOrganisation } from "../../api/detail/suspend-organisation"

export function useSuspendOrganisation(id: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (reason: string) => suspendOrganisation(id, reason),
    onSuccess: () => {
      toast.success("Organisation suspended.")
      void qc.invalidateQueries({ queryKey: ["organisation", id] })
      void qc.invalidateQueries({ queryKey: ["organisations"] })
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  })
}
