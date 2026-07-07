import { api } from "@/lib/api/client";

export function listCatalog<T>(resource: string): Promise<T[]> {
  return api.get<T[]>(`/admin/${resource}`);
}
