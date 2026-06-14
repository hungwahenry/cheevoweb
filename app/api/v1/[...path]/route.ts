import type { NextRequest } from "next/server";
import { getSessionToken } from "@/lib/auth/cookie";
import { env } from "@/lib/env";

/**
 * Catch-all BFF proxy. Forwards every /api/v1/* call to the backend, injecting the
 * bearer token from the httpOnly cookie so it never touches client JS. One file
 * covers the whole admin API — no per-endpoint server code.
 */
async function handle(
  request: NextRequest,
  ctx: { params: Promise<{ path: string[] }> },
): Promise<Response> {
  const { path } = await ctx.params;
  const token = await getSessionToken();

  const target = `${env.backendUrl}/api/v1/${path.join("/")}${request.nextUrl.search}`;
  const headers = new Headers();
  headers.set("accept", "application/json");
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);
  if (token) headers.set("authorization", `Bearer ${token}`);

  const hasBody = request.method !== "GET" && request.method !== "HEAD";
  const body = hasBody ? await request.arrayBuffer() : undefined;

  const upstream = await fetch(target, {
    method: request.method,
    headers,
    body,
    redirect: "manual",
  });

  const responseHeaders = new Headers();
  const upstreamType = upstream.headers.get("content-type");
  if (upstreamType) responseHeaders.set("content-type", upstreamType);

  return new Response(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}

export {
  handle as GET,
  handle as POST,
  handle as PATCH,
  handle as PUT,
  handle as DELETE,
};
