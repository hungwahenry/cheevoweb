"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { getErrorMessage } from "@/lib/api/errors"
import { fetchFeedPage } from "../api/fetch-feed-page"
import type { FeedEvent, FeedPage } from "../types"
import { EventCard } from "./event-card"

export function FeedList({ initial }: { initial: FeedPage }) {
  const [items, setItems] = useState<FeedEvent[]>(initial.items)
  const [page, setPage] = useState(initial.page)
  const [lastPage, setLastPage] = useState(initial.last_page)
  const [loading, setLoading] = useState(false)

  async function loadMore() {
    if (loading || page >= lastPage) return
    setLoading(true)
    try {
      const next = await fetchFeedPage(page + 1, initial.per_page)
      setItems((prev) => [...prev, ...next.items])
      setPage(next.page)
      setLastPage(next.last_page)
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-muted/40 p-10 text-center text-sm text-foreground/60">
        No upcoming events right now. Check back soon.
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {page < lastPage ? (
        <div className="mt-12 flex justify-center">
          <Button
            size="lg"
            variant="outline"
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? <Spinner /> : "Load more"}
          </Button>
        </div>
      ) : null}
    </div>
  )
}
