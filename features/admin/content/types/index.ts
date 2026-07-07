export interface Page {
  id: string
  slug: string
  title: string
  body_html: string
  meta_description: string | null
  is_published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface Welcome {
  headline: string
  subheadline: string
  background_url: string | null
}
