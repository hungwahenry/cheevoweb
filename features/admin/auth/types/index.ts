export interface AdminUser {
  id: string
  email: string
  role: string
  profile?: {
    first_name?: string | null
    last_name?: string | null
    username?: string | null
    avatar_url?: string | null
  } | null
}
