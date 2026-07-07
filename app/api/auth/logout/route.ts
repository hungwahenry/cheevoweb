import { NextResponse } from "next/server"
import { clearSessionToken, getSessionToken } from "@/lib/auth/cookie"
import { env } from "@/lib/env"

/** Revokes the token on the backend (best-effort) and clears the session cookie. */
export async function POST(): Promise<Response> {
  const token = await getSessionToken()

  if (token) {
    try {
      await fetch(`${env.backendUrl}/api/v1/auth/logout`, {
        method: "POST",
        headers: { authorization: `Bearer ${token}` },
      })
    } catch {
      // The cookie is cleared regardless — a stale backend token expires on its own.
    }
  }

  await clearSessionToken()

  return NextResponse.json({
    status: "success",
    message: "Signed out.",
    data: null,
  })
}
