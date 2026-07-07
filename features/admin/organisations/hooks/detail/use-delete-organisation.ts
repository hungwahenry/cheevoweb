import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/api/errors";
import { deleteOrganisation } from "../../api/detail/delete-organisation";

export function useDeleteOrganisation(id: string) {
  const qc = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (reason: string) => deleteOrganisation(id, reason),
    onSuccess: () => {
      toast.success("Organisation deleted.");
      void qc.invalidateQueries({ queryKey: ["organisations"] });
      router.replace("/dashboard/organisations");
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}
