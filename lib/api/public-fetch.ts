import "server-only";
import { ApiError } from "@/lib/api/errors";
import type { Envelope } from "@/lib/api/types";
import { env } from "@/lib/env";

type PublicFetchInit = RequestInit & {
  next?: { revalidate?: number; tags?: string[] };
};

export async function publicFetch<T>(
  path: string,
  init?: PublicFetchInit,
): Promise<T> {
  const response = await fetch(`${env.backendUrl}/api/v1/${path}`, {
    ...init,
    headers: { accept: "application/json", ...(init?.headers ?? {}) },
  });

  const body = (await response.json().catch(() => null)) as
    | (Envelope<T> & { code?: string })
    | null;

  if (!response.ok) {
    throw new ApiError(
      body?.message ?? "Request failed",
      response.status,
      body?.code,
    );
  }

  return (body as Envelope<T>).data;
}
