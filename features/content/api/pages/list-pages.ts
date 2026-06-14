import { api } from "@/lib/api/client";
import type { Page } from "../../types";

export function listPages(): Promise<Page[]> {
  return api.get<Page[]>("/admin/pages");
}
