import "server-only"
import { publicFetch } from "@/lib/api/public-fetch"
import type { PublicPageSummary } from "@/features/public/pages/types"

export function listPublicPages(): Promise<PublicPageSummary[]> {
  return publicFetch<PublicPageSummary[]>("pages", {
    next: { revalidate: 300, tags: ["pages"] },
  })
}
