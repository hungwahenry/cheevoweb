import { api } from "@/lib/api/client"

export function setPagePublished(
  id: string,
  published: boolean
): Promise<unknown> {
  return api.post(`/admin/pages/${id}/${published ? "publish" : "unpublish"}`)
}
