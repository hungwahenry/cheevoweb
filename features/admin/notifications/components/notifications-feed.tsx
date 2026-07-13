"use client"

import { Bell, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { formatDateTime } from "@/lib/format"
import {
  useNotificationActions,
  useNotifications,
} from "../hooks/use-notifications"

const PER_PAGE = 20

export function NotificationsFeed() {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useNotifications(page)
  const { readOne, readAll } = useNotificationActions()

  const items = data?.items ?? []
  const hasNext = items.length === PER_PAGE

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => readAll.mutate()}
          disabled={readAll.isPending}
        >
          <Check /> Mark all read
        </Button>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed py-16 text-muted-foreground">
          <Bell className="size-6" />
          <p className="text-sm">No alerts yet.</p>
        </div>
      ) : (
        <ul className="divide-y rounded-lg border">
          {items.map((item) => (
            <li
              key={item.id}
              className={`flex items-start gap-3 p-4 ${
                item.read_at ? "" : "cursor-pointer bg-muted/40"
              }`}
              onClick={() => !item.read_at && readOne.mutate(item.id)}
            >
              <span
                className={`mt-1.5 size-2 shrink-0 rounded-full ${
                  item.read_at ? "bg-transparent" : "bg-primary"
                }`}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{item.title ?? item.type}</p>
                {item.body ? (
                  <p className="text-sm text-muted-foreground">{item.body}</p>
                ) : null}
                <p className="mt-1 text-xs text-muted-foreground">
                  {formatDateTime(item.created_at)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={!hasNext}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
