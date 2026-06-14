import { api } from "@/lib/api/client";
import type { Welcome } from "../../types";

export function updateWelcome(payload: {
  headline?: string;
  subheadline?: string;
}): Promise<Welcome> {
  return api.post<Welcome>("/admin/welcome", payload);
}
