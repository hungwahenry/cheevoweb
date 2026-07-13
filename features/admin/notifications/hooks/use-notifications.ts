import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { listNotifications, unreadCount } from "../api/list-notifications"
import { markAllRead, markRead } from "../api/mark-read"

export function useNotifications(page: number) {
  return useQuery({
    queryKey: ["admin-notifications", "list", page],
    queryFn: () => listNotifications(page),
    placeholderData: keepPreviousData,
  })
}

export function useUnreadCount() {
  return useQuery({
    queryKey: ["admin-notifications", "unread"],
    queryFn: unreadCount,
    refetchInterval: 60_000,
  })
}

export function useNotificationActions() {
  const qc = useQueryClient()
  const invalidate = () =>
    qc.invalidateQueries({ queryKey: ["admin-notifications"] })

  const readOne = useMutation({ mutationFn: markRead, onSuccess: invalidate })
  const readAll = useMutation({ mutationFn: markAllRead, onSuccess: invalidate })

  return { readOne, readAll }
}
