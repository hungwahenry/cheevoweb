import type { AuditEntry, EntityRef } from "@/lib/api/types";

export type EventStatus = "draft" | "published" | "past";

export interface EventCore {
  id: string;
  title: string;
  slug: string;
  status: EventStatus;
  starts_at: string | null;
  ends_at: string | null;
  comments_locked_at: string | null;
  published_at: string | null;
  created_at: string;
}

export interface EventRow extends EventCore {
  organisation: EntityRef;
  ref: EntityRef;
}

export interface EventStats {
  tickets_sold: number;
  revenue_minor: number;
  orders_count: number;
  rsvps_count: number;
  comments_count: number;
  flagged_comments: number;
  reports_against: number;
}

export interface EventOrderRecent extends EntityRef {
  total_minor: number;
  buyer: EntityRef;
  created_at: string;
}

export interface TicketType {
  id: string;
  name: string;
  status: string;
  gross_price: number;
  sold_count: number;
  quantity: number | null;
}

export interface EventDetail extends EventCore {
  organisation: EntityRef;
  stats: EventStats;
  orders_recent: EventOrderRecent[];
  ticket_types: TicketType[];
  audit_trail: AuditEntry[];
}

export interface ListEventsParams {
  page: number;
  per_page: number;
  q?: string;
  status?: EventStatus;
}
