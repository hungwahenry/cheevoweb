import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/api/errors";
import { runCommand } from "../api/run-command";

export function useRunCommand() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (command: string) => runCommand(command),
    onSuccess: (data) => {
      toast.success(`${data.command} ran successfully.`);
      void qc.invalidateQueries({ queryKey: ["ops-health"] });
    },
    onError: (e) => toast.error(getErrorMessage(e)),
  });
}
