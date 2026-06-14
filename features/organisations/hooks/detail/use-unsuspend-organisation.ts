import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/api/errors";
import { unsuspendOrganisation } from "../../api/detail/unsuspend-organisation";

export function useUnsuspendOrganisation(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => unsuspendOrganisation(id),
    onSuccess: () => {
      toast.success("Organisation unsuspended.");
      void qc.invalidateQueries({ queryKey: ["organisation", id] });
      void qc.invalidateQueries({ queryKey: ["organisations"] });
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}
