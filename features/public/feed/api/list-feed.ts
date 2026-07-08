import "server-only"
import { publicFetch } from "@/lib/api/public-fetch"
import type { FeedPage } from "../types"

/** First page of the public events feed, rendered server-side for SEO. */
export function listFeed(page = 1, perPage = 12): Promise<FeedPage> {
  return publicFetch<FeedPage>(`feed?page=${page}&per_page=${perPage}`, {
    next: { revalidate: 120, tags: ["feed"] },
  })
}
