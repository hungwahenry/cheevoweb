export type BroadcastKind = "system" | "marketing"
export type BroadcastStatus =
  | "draft"
  | "scheduled"
  | "sending"
  | "sent"
  | "cancelled"
  | "failed"
export type Channel = "email" | "push" | "inapp"

export interface Segment {
  user_ids?: string[]
  roles?: string[]
  interest_ids?: number[]
  cities?: string[]
  has_ordered?: boolean
  active_since?: string
  inactive_since?: string
  has_upcoming_rsvp?: boolean
}

export interface AnnouncementRow {
  id: string
  kind: BroadcastKind
  status: BroadcastStatus
  title: string
  channels: Channel[]
  recipients_count: number
  scheduled_at: string | null
  sent_at: string | null
  created_at: string
}

export interface BroadcastLink {
  id: string
  url: string
  click_count: number
}

export interface AnnouncementDetail extends AnnouncementRow {
  body: string
  audience: Segment
  stats: {
    recipients: number
    email: number
    push: number
    inapp: number
    failed: number
    clicks: number
  }
  links: BroadcastLink[]
  failure_reason: string | null
  started_at: string | null
  updated_at: string
}

export interface SegmentOptions {
  roles: string[]
  cities: string[]
}

export interface BroadcastInput {
  kind: BroadcastKind
  title: string
  body: string
  channels: Channel[]
  audience: Segment
}

export interface ListAnnouncementsParams {
  page: number
  per_page: number
  kind?: BroadcastKind
  status?: BroadcastStatus
}
