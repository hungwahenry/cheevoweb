import { ApiError } from "./errors";
import type { Envelope } from "./types";

export type QueryParams = Record<
  string,
  string | number | boolean | undefined | null
>;

function queryString(params?: QueryParams): string {
  if (!params) return "";
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  }
  const result = search.toString();
  return result ? `?${result}` : "";
}

async function request<T>(
  method: string,
  path: string,
  options: { params?: QueryParams; body?: unknown } = {},
): Promise<T> {
  const hasBody = options.body !== undefined;
  const response = await fetch(`/api/v1${path}${queryString(options.params)}`, {
    method,
    headers: hasBody ? { "content-type": "application/json" } : undefined,
    body: hasBody ? JSON.stringify(options.body) : undefined,
  });

  const text = await response.text();
  const json: unknown = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const body = (json ?? {}) as {
      message?: string;
      code?: string;
      errors?: Record<string, string[]>;
    };
    throw new ApiError(
      body.message ?? "Something went wrong.",
      response.status,
      body.code,
      body.errors,
    );
  }

  return (json as Envelope<T>).data;
}

/** Browser-side client. Hits same-origin /api/v1/* (the BFF proxy forwards with the cookie token). */
export const api = {
  get: <T>(path: string, params?: QueryParams) =>
    request<T>("GET", path, { params }),
  post: <T>(path: string, body?: unknown, params?: QueryParams) =>
    request<T>("POST", path, { body, params }),
  patch: <T>(path: string, body?: unknown) =>
    request<T>("PATCH", path, { body }),
  put: <T>(path: string, body?: unknown) => request<T>("PUT", path, { body }),
  delete: <T>(path: string, body?: unknown) =>
    request<T>("DELETE", path, { body }),
};
