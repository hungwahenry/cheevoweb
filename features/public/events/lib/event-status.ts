import type { PublicEvent } from "@/features/public/events/types"

export function isEventEnded(
  event: Pick<PublicEvent, "status" | "ends_at">
): boolean {
  if (event.status === "past") return true
  return (
    event.ends_at !== null && new Date(event.ends_at).getTime() <= Date.now()
  )
}
