export interface SimpleCatalogItem {
  id: number
  slug: string
  name: string
  sort_order: number
  is_active: boolean
  base_url?: string | null
}

export type Interest = Omit<SimpleCatalogItem, "base_url">
export type OrgCategory = Omit<SimpleCatalogItem, "base_url">
export interface SocialPlatform extends SimpleCatalogItem {
  base_url: string | null
}

export type ReportScope = "event" | "comment" | "user" | "organisation"

export interface ReportReason {
  id: string
  slug: string
  label: string
  description: string | null
  scope_types: ReportScope[]
  requires_details: boolean
  display_order: number
  is_active: boolean
}
