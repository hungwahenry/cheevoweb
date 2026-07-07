import "server-only"
import { ApiError } from "@/lib/api/errors"
import { publicFetch } from "@/lib/api/public-fetch"
import type { PublicPage } from "@/features/public/pages/types"

export async function getPublicPage(slug: string): Promise<PublicPage | null> {
  try {
    return await publicFetch<PublicPage>(`pages/${encodeURIComponent(slug)}`, {
      next: { revalidate: 300, tags: ["pages", `page:${slug}`] },
    })
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null
    throw error
  }
}
