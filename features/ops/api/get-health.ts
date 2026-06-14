import { api } from "@/lib/api/client";
import type { OpsHealth } from "../types";

export function getHealth(): Promise<OpsHealth> {
  return api.get<OpsHealth>("/admin/ops/health");
}
