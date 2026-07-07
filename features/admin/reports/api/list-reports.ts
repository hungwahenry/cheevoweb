import { api } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";
import type { ListReportsParams, ReportRow } from "../types";

export function listReports(
  params: ListReportsParams,
): Promise<Paginated<ReportRow>> {
  return api.get<Paginated<ReportRow>>("/admin/reports", {
    page: params.page,
    per_page: params.per_page,
    status: params.status,
    target_type: params.target_type,
  });
}
