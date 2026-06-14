import { api } from "@/lib/api/client";
import type { ReportDetail } from "../../types";

export function getReport(id: string): Promise<ReportDetail> {
  return api.get<ReportDetail>(`/admin/reports/${id}`);
}
