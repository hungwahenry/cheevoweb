import { NextResponse, type NextRequest } from "next/server";
import { setSessionToken } from "@/lib/auth/cookie";
import { env } from "@/lib/env";

/**
 * Exchanges an OTP for a session: verifies with the backend, gates to admins only,
 * and stores the bearer token in an httpOnly cookie. The token is never returned to
 * the browser.
 */
export async function POST(request: NextRequest): Promise<Response> {
  const { email, code } = (await request.json()) as {
    email?: string;
    code?: string;
  };

  const upstream = await fetch(`${env.backendUrl}/api/v1/auth/verify-otp`, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify({ email, code }),
  });

  const json = (await upstream.json()) as {
    message?: string;
    code?: string;
    errors?: Record<string, string[]>;
    data?: { token: string; user: { role: string } };
  };

  if (!upstream.ok || !json.data) {
    return NextResponse.json(json, { status: upstream.status });
  }

  if (json.data.user.role !== "admin") {
    return NextResponse.json(
      {
        status: "error",
        message: "You are not allowed to access this panel.",
        code: "not_admin",
      },
      { status: 403 },
    );
  }

  await setSessionToken(json.data.token);

  return NextResponse.json({
    status: "success",
    message: "Signed in.",
    data: { user: json.data.user },
  });
}
