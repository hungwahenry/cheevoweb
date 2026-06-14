import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/api/errors";
import { updateFlag } from "../api/update-flag";

export function useUpdateFlag() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: { enabled?: boolean; rollout_pct?: number; is_public?: boolean };
    }) => updateFlag(id, payload),
    onSuccess: () => {
      toast.success("Flag updated.");
      void qc.invalidateQueries({ queryKey: ["feature-flags"] });
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}
