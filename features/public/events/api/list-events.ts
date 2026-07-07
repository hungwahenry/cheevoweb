import "server-only"
import { publicFetch } from "@/lib/api/public-fetch"

export type PublicEventLink = { slug: string; updated_at: string }

/** Lean list of indexable public events for the sitemap. */
export function listPublicEvents(): Promise<PublicEventLink[]> {
  return publicFetch<PublicEventLink[]>("events", {
    next: { revalidate: 600, tags: ["events"] },
  })
}
