import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { getErrorMessage } from "@/lib/api/errors"
import { createAnnouncement } from "../api/create-announcement"
import type { BroadcastInput } from "../types"

export function useCreateAnnouncement() {
  const qc = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: (input: BroadcastInput) => createAnnouncement(input),
    onSuccess: (broadcast) => {
      toast.success("Draft saved.")
      void qc.invalidateQueries({ queryKey: ["announcements"] })
      router.replace(`/dashboard/announcements/${broadcast.id}`)
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  })
}
