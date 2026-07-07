import type { PublicEvent } from "@/features/public/events/types"

export function EventFlyer({ event }: { event: PublicEvent }) {
  if (!event.flyer_url) return null

  return (
    <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-muted">
      {event.flyer_type === "video" ? (
        <video
          src={event.flyer_url}
          poster={event.flyer_poster_url ?? undefined}
          className="size-full object-cover"
          muted
          loop
          autoPlay
          playsInline
        />
      ) : (
        <img
          src={event.flyer_url}
          alt={event.title}
          className="size-full object-cover"
        />
      )}
    </div>
  )
}
