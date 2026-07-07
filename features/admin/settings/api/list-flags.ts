import { api } from "@/lib/api/client"
import type { FeatureFlag } from "../types"

export function listFlags(): Promise<FeatureFlag[]> {
  return api.get<FeatureFlag[]>("/admin/feature-flags")
}
