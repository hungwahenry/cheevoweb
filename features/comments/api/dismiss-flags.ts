import { api } from "@/lib/api/client";

export function dismissFlags(id: string): Promise<unknown> {
  return api.post(`/admin/comments/${id}/dismiss-flags`);
}
