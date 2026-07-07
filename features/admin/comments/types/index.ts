import type { EntityRef } from "@/lib/api/types"

export interface Comment {
  id: string
  body: string | null
  gif: string | null
  flags_count: number
  likes_count: number
  replies_count: number
  parent_id: string | null
  created_at: string
  author: EntityRef
  event: EntityRef
}

export interface ListCommentsParams {
  page: number
  per_page: number
  flagged_only?: boolean
  event_id?: string
}
