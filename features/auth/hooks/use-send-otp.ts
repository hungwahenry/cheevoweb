import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/api/errors";
import { sendOtp } from "../api/send-otp";

export function useSendOtp() {
  return useMutation({
    mutationFn: (email: string) => sendOtp(email),
    onError: (error) => toast.error(getErrorMessage(error)),
  });
}
