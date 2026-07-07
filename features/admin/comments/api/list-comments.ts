import { api } from "@/lib/api/client";
import type { Paginated } from "@/lib/api/types";
import type { Comment, ListCommentsParams } from "../types";

export function listComments(
  params: ListCommentsParams,
): Promise<Paginated<Comment>> {
  return api.get<Paginated<Comment>>("/admin/comments", {
    page: params.page,
    per_page: params.per_page,
    flagged_only: params.flagged_only,
    event_id: params.event_id,
  });
}
