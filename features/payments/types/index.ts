import type { AuditEntry, EntityRef } from "@/lib/api/types";

export type PaymentStatus =
  | "pending"
  | "successful"
  | "failed"
  | "abandoned"
  | "refunded";

export interface PaymentCore {
  id: string;
  reference: string;
  provider: string;
  status: PaymentStatus;
  amount_minor: number;
  currency: string;
  authorized_at: string | null;
  failed_at: string | null;
  refunded_at: string | null;
  created_at: string;
}

export interface PaymentRow extends PaymentCore {
  user: EntityRef;
  ref: EntityRef;
}

export interface PaymentDetail extends PaymentCore {
  user: EntityRef;
  order: EntityRef | null;
  event: EntityRef | null;
  provider_reference: string | null;
  provider_response: unknown;
  metadata: unknown;
  audit_trail: AuditEntry[];
}

export interface ListPaymentsParams {
  page: number;
  per_page: number;
  status?: PaymentStatus;
  provider?: string;
}
