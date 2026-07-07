import { SITE_URL } from "@/features/public/shell/config/site"
import type { PublicEvent } from "@/features/public/events/types"

/** Schema.org Event structured data → Google rich results + event listings. */
export function EventJsonLd({ event }: { event: PublicEvent }) {
  const url = `${SITE_URL}/events/${event.slug}`
  const priceMinor = event.tickets_min_price ?? 0

  const location =
    event.venue_name || event.address || event.city
      ? {
          "@type": "Place",
          name: event.venue_name ?? event.city ?? "Venue",
          address:
            [event.address, event.city].filter(Boolean).join(", ") || undefined,
        }
      : undefined

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    url,
    ...(event.description ? { description: event.description } : {}),
    ...(event.starts_at ? { startDate: event.starts_at } : {}),
    ...(event.ends_at ? { endDate: event.ends_at } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    ...(event.flyer_url && event.flyer_type === "image"
      ? { image: [event.flyer_url] }
      : {}),
    ...(location ? { location } : {}),
    ...(event.organisation.name
      ? {
          organizer: { "@type": "Organization", name: event.organisation.name },
        }
      : {}),
    isAccessibleForFree: priceMinor === 0,
    offers: {
      "@type": "Offer",
      price: (priceMinor / 100).toFixed(2),
      priceCurrency: event.currency,
      availability: "https://schema.org/InStock",
      url,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
