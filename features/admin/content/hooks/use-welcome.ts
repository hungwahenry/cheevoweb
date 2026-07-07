import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getErrorMessage } from "@/lib/api/errors"
import { getWelcome } from "../api/welcome/get-welcome"
import {
  updateWelcome,
  type UpdateWelcomePayload,
} from "../api/welcome/update-welcome"

export function useWelcome() {
  return useQuery({ queryKey: ["welcome"], queryFn: getWelcome })
}

export function useUpdateWelcome() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateWelcomePayload) => updateWelcome(payload),
    onSuccess: () => {
      toast.success("Welcome content updated.")
      void qc.invalidateQueries({ queryKey: ["welcome"] })
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  })
}
