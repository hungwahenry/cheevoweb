import { api } from "@/lib/api/client";
import type { SystemConfig } from "../types";

export function updateConfig(
  id: string,
  payload: { value?: unknown; description?: string | null; is_public?: boolean },
): Promise<SystemConfig> {
  return api.patch<SystemConfig>(`/admin/system-configs/${id}`, payload);
}
