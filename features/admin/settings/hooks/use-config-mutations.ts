import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { getErrorMessage } from "@/lib/api/errors"
import { resetConfig } from "../api/reset-config"
import { updateConfig } from "../api/update-config"

export function useConfigMutations() {
  const qc = useQueryClient()
  const onError = (e: unknown) => toast.error(getErrorMessage(e))
  const refresh = () =>
    void qc.invalidateQueries({ queryKey: ["system-configs"] })

  const update = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string
      payload: { value?: unknown; is_public?: boolean }
    }) => updateConfig(id, payload),
    onSuccess: () => {
      toast.success("Config updated.")
      refresh()
    },
    onError,
  })
  const reset = useMutation({
    mutationFn: (id: string) => resetConfig(id),
    onSuccess: () => {
      toast.success("Config reset to default.")
      refresh()
    },
    onError,
  })

  return { update, reset }
}
