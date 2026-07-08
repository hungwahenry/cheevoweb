export type FeedInterest = { id: number; slug: string; name: string }

export type FeedEvent = {
  id: string
  title: string
  slug: string
  web_url: string
  starts_at: string | null
  ends_at: string | null
  venue_name: string | null
  city: string | null
  flyer_url: string | null
  flyer_type: "image" | "video" | null
  flyer_poster_url: string | null
  tickets_count: number
  tickets_min_price: number | null
  tickets_max_price: number | null
  currency: string
  interests: FeedInterest[]
  organisation: {
    id: string
    name: string | null
    slug: string | null
    logo_url: string | null
    subscribers_count: number
  }
}

export type FeedPage = {
  items: FeedEvent[]
  page: number
  last_page: number
  per_page: number
  total: number
}
