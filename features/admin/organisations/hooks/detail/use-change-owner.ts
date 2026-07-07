import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getErrorMessage } from "@/lib/api/errors"
import { changeOwner } from "../../api/detail/change-owner"

export function useChangeOwner(id: string) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ userId, reason }: { userId: string; reason?: string }) =>
      changeOwner(id, userId, reason),
    onSuccess: () => {
      toast.success("Owner changed.")
      void qc.invalidateQueries({ queryKey: ["organisation", id] })
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  })
}
