import type { AuditEntry, EntityRef } from "@/lib/api/types";

export type ReportStatus = "open" | "under_review" | "actioned" | "dismissed";

export interface ReportCore {
  id: string;
  status: ReportStatus;
  reason: { slug: string; label: string };
  details: string | null;
  resolution_note: string | null;
  reviewed_at: string | null;
  created_at: string;
}

export interface ReportRow extends ReportCore {
  target_type: string;
  target_id: string;
  target: EntityRef | null;
  reporter: EntityRef;
}

export interface ReportDetail extends ReportRow {
  reviewed_by: EntityRef | null;
  audit_trail: AuditEntry[];
}

export type ReportAction = "delete_target" | "warn" | "no_action";

export interface ListReportsParams {
  page: number;
  per_page: number;
  status?: ReportStatus;
  target_type?: string;
}
