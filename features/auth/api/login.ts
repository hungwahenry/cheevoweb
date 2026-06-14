import { ApiError } from "@/lib/api/errors";
import type { AdminUser } from "../types";

/** Exchanges the OTP for a session via the BFF login route (sets the httpOnly cookie). */
export async function login(email: string, code: string): Promise<AdminUser> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, code }),
  });
  const json = await response.json();

  if (!response.ok) {
    throw new ApiError(
      json.message ?? "Sign-in failed.",
      response.status,
      json.code,
      json.errors,
    );
  }

  return json.data.user as AdminUser;
}
