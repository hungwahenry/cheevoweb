import { api } from "@/lib/api/client";
import type { OpsCommand } from "../types";

export function listCommands(): Promise<OpsCommand[]> {
  return api.get<OpsCommand[]>("/admin/ops/commands");
}
