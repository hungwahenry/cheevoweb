export type PublicPageSummary = {
  slug: string
  title: string
  updated_at: string | null
}

export type PublicPage = {
  slug: string
  title: string
  body_html: string
  meta_description: string | null
  published_at: string | null
  updated_at: string | null
}
