import { api } from "@/lib/api/client";

export function suspendOrganisation(id: string, reason: string): Promise<unknown> {
  return api.post(`/admin/organisations/${id}/suspend`, { reason });
}
