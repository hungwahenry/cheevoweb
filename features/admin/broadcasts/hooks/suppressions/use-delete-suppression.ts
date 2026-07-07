import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getErrorMessage } from "@/lib/api/errors"
import { deleteSuppression } from "../../api/suppressions/delete-suppression"

export function useDeleteSuppression() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteSuppression(id),
    onSuccess: () => {
      toast.success("Suppression removed.")
      void qc.invalidateQueries({ queryKey: ["suppressions"] })
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  })
}
