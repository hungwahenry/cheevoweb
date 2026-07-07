import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/api/errors";
import { login } from "../api/login";
import { sessionKey } from "./use-session";

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      login(email, code),
    onSuccess: (user) => {
      queryClient.setQueryData(sessionKey, user);
      router.replace("/dashboard");
    },
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
