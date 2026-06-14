import type { AuditEntry, EntityRef } from "@/lib/api/types";

export type BroadcastStatus =
  | "queued"
  | "sending"
  | "sent"
  | "failed"
  | "cancelled";

export interface BroadcastCore {
  id: string;
  subject: string;
  audience: string;
  status: BroadcastStatus;
  recipients_count: number;
  sent_count: number;
  failed_count: number;
  failure_reason: string | null;
  sent_at: string | null;
  created_at: string;
}

export interface BroadcastRow extends BroadcastCore {
  organisation: EntityRef;
  event: EntityRef;
  created_by: EntityRef;
  ref: EntityRef;
}

export interface BroadcastDetail extends BroadcastRow {
  body_html: string;
  body_text: string;
  audit_trail: AuditEntry[];
}

export interface ListBroadcastsParams {
  page: number;
  per_page: number;
  status?: BroadcastStatus;
}

export type SuppressionReason = "unsubscribed" | "bounced" | "complained";

export interface Suppression {
  id: string;
  email: string;
  reason: SuppressionReason;
  organisation_id: string | null;
  created_at: string;
}

export interface ListSuppressionsParams {
  page: number;
  per_page: number;
  q?: string;
  reason?: SuppressionReason;
}
