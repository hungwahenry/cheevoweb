export interface AdminNotification {
  id: string
  type: string
  title: string | null
  body: string | null
  data: Record<string, unknown>
  read_at: string | null
  created_at: string
}
