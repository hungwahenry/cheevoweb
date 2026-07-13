import { api } from "@/lib/api/client"
import type { Paginated } from "@/lib/api/types"
import type { AdminNotification } from "../types"

export function listNotifications(
  page: number
): Promise<Paginated<AdminNotification>> {
  return api.get<Paginated<AdminNotification>>("/notifications", {
    audience: "admin",
    page,
  })
}

export function unreadCount(): Promise<{ unread: number }> {
  return api.get<{ unread: number }>("/notifications/unread-count", {
    audience: "admin",
  })
}
