import { api } from "@/lib/api/client";
import type { UserDetail } from "../../types";

export function getUser(id: string): Promise<UserDetail> {
  return api.get<UserDetail>(`/admin/users/${id}`);
}
