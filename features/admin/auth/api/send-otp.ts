import { api } from "@/lib/api/client"

/** Public — sends the one-time code to the email (proxied, no token required). */
export function sendOtp(email: string): Promise<unknown> {
  return api.post("/auth/send-otp", { email })
}
