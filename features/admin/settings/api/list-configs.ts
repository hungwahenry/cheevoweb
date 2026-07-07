import { api } from "@/lib/api/client";
import type { SystemConfig } from "../types";

export function listConfigs(): Promise<SystemConfig[]> {
  return api.get<SystemConfig[]>("/admin/system-configs");
}
