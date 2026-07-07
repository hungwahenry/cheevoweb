import type { AuditEntry, EntityRef } from "@/lib/api/types";

export interface OrganisationCore {
  id: string;
  name: string;
  slug: string;
  category: string | null;
  contact_email: string | null;
  suspended_at: string | null;
  suspended_reason: string | null;
  created_at: string;
}

export interface OrganisationRow extends OrganisationCore {
  ref: EntityRef;
}

export interface OrgStats {
  events_count: number;
  subscribers_count: number;
  total_revenue_minor: number;
  tickets_sold: number;
  members_count: number;
  paid_out_minor: number;
  reports_against: number;
}

export interface OrgMemberRef extends EntityRef {
  role: string;
}

export interface OrgPayoutRecent extends EntityRef {
  amount_minor: number;
  requested_at: string;
}

export interface OrgBroadcastRecent extends EntityRef {
  sent_count: number;
  created_at: string;
}

export interface OrganisationDetail extends OrganisationCore {
  stats: OrgStats;
  members: OrgMemberRef[];
  events_recent: EntityRef[];
  payouts_recent: OrgPayoutRecent[];
  broadcasts_recent: OrgBroadcastRecent[];
  audit_trail: AuditEntry[];
}

export interface ListOrgsParams {
  page: number;
  per_page: number;
  q?: string;
  suspended?: boolean;
}
