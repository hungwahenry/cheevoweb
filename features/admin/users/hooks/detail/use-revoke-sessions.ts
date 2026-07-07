import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getErrorMessage } from "@/lib/api/errors"
import { revokeSessions } from "../../api/detail/revoke-sessions"

export function useRevokeSessions(id: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => revokeSessions(id),
    onSuccess: (result) => {
      toast.success(
        `Revoked ${result.revoked} ${result.revoked === 1 ? "session" : "sessions"}.`
      )
      void queryClient.invalidateQueries({ queryKey: ["user", id] })
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  })
}
