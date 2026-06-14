import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth/constants";

/**
 * Route guard (Next 16's renamed `middleware`). Gates page navigation on the presence
 * of the session cookie — actual token validity is enforced by the backend on every
 * call. Excludes /api, static assets, and /login via the matcher.
 */
export function proxy(request: NextRequest): NextResponse {
  const hasSession = request.cookies.has(SESSION_COOKIE);
  const isLoginRoute = request.nextUrl.pathname === "/login";

  if (!hasSession && !isLoginRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (hasSession && isLoginRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
