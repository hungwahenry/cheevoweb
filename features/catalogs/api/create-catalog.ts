import { api } from "@/lib/api/client";

export function createCatalog<T>(
  resource: string,
  payload: Record<string, unknown>,
): Promise<T> {
  return api.post<T>(`/admin/${resource}`, payload);
}
