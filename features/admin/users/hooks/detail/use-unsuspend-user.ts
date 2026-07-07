import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getErrorMessage } from "@/lib/api/errors"
import { unsuspendUser } from "../../api/detail/unsuspend-user"

export function useUnsuspendUser(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => unsuspendUser(id),
    onSuccess: () => {
      toast.success("User unsuspended.")
      void queryClient.invalidateQueries({ queryKey: ["user", id] })
      void queryClient.invalidateQueries({ queryKey: ["users"] })
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })
}
