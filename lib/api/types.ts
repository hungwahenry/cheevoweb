/** Shared contract shapes mirroring the backend's ApiEnvelope + admin primitives. */

export interface Envelope<T> {
  status: string
  message: string
  data: T
  meta?: Record<string, unknown>
}

export interface Paginated<T> {
  items: T[]
  page: number
  last_page: number
  per_page: number
  total: number
}

export interface ApiErrorBody {
  status: "error"
  message: string
  code?: string
  errors?: Record<string, string[]>
}

/** The universal cross-link every admin 360 response uses for related entities. */
export interface EntityRef {
  type: string
  id: string
  label: string
  sublabel?: string | null
  thumbnail?: string | null
  deep_link?: string | null
}

/** One admin-action row — embedded in every 360's audit trail and the audit log. */
export interface AuditEntry {
  id: string
  action: string
  admin: EntityRef
  target_type: string | null
  target_id: string | null
  payload: unknown
  reason: string | null
  ip: string | null
  user_agent: string | null
  request_id: string | null
  created_at: string
}
