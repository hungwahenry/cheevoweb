import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getErrorMessage } from "@/lib/api/errors"
import { deleteComment } from "../api/delete-comment"
import { dismissFlags } from "../api/dismiss-flags"

export function useCommentActions() {
  const qc = useQueryClient()
  const onError = (e: unknown) => toast.error(getErrorMessage(e))
  const refresh = () => void qc.invalidateQueries({ queryKey: ["comments"] })

  const remove = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      deleteComment(id, reason),
    onSuccess: () => {
      toast.success("Comment deleted.")
      refresh()
    },
    onError,
  })
  const dismiss = useMutation({
    mutationFn: (id: string) => dismissFlags(id),
    onSuccess: () => {
      toast.success("Flags dismissed.")
      refresh()
    },
    onError,
  })

  return { remove, dismiss }
}
