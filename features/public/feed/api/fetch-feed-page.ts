import { api } from "@/lib/api/client"
import type { FeedPage } from "../types"

/** Browser-side pagination for "load more". */
export function fetchFeedPage(
  page: number,
  perPage: number
): Promise<FeedPage> {
  return api.get<FeedPage>("/feed", { page, per_page: perPage })
}
