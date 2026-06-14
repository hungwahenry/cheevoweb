import { api } from "@/lib/api/client";
import type { FeatureFlag } from "../types";

export function updateFlag(
  id: string,
  payload: { enabled?: boolean; rollout_pct?: number; is_public?: boolean },
): Promise<FeatureFlag> {
  return api.patch<FeatureFlag>(`/admin/feature-flags/${id}`, payload);
}
