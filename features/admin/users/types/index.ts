import type { AuditEntry, EntityRef } from "@/lib/api/types"

export interface UserProfileSummary {
  username: string | null
  display_name: string | null
  city: string | null
  avatar_url: string
  completed_at: string | null
}

export interface UserAccount {
  id: string
  email: string
  role: string
  email_verified_at: string | null
  suspended_at: string | null
  suspended_reason: string | null
  created_at: string
  profile: UserProfileSummary | null
}

export interface UserRow extends UserAccount {
  ref: EntityRef
}

export interface UserStats {
  orders_count: number
  total_spent_minor: number
  tickets_held: number
  comments_count: number
  rsvps_count: number
  reports_filed: number
  reports_against: number
  active_sessions: number
  blocks_outgoing: number
  blocks_incoming: number
  unread_notifications: number
}

export interface OrgMembershipRef extends EntityRef {
  role: string
}

export interface OrderRecent extends EntityRef {
  total_minor: number
  event: EntityRef
  created_at: string
}

export interface TicketRecent {
  id: string
  code: string
  status: string
  ticket_name: string
  event: EntityRef
}

export interface UserSession {
  id: string
  name: string
  last_used_at: string | null
  created_at: string
}

export interface UserDetail extends UserAccount {
  stats: UserStats
  organisations: OrgMembershipRef[]
  orders_recent: OrderRecent[]
  tickets_recent: TicketRecent[]
  sessions: UserSession[]
  audit_trail: AuditEntry[]
}

export interface ListUsersParams {
  page: number
  per_page: number
  q?: string
  suspended?: boolean
  role?: string
}
