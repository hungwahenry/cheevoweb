import { api } from "@/lib/api/client";
import type { ReportAction } from "../../types";

export function actionReport(
  id: string,
  action: ReportAction,
  resolutionNote: string,
): Promise<unknown> {
  return api.post(`/admin/reports/${id}/action`, {
    action,
    resolution_note: resolutionNote,
  });
}
