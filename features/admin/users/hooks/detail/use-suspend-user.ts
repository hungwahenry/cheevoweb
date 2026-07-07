import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/api/errors";
import { suspendUser } from "../../api/detail/suspend-user";

export function useSuspendUser(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reason: string) => suspendUser(id, reason),
    onSuccess: () => {
      toast.success("User suspended.");
      void queryClient.invalidateQueries({ queryKey: ["user", id] });
      void queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
