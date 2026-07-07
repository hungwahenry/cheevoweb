import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicEvent } from "@/features/public/events/api/get-event";
import { listPublicPages } from "@/features/public/pages/api/list-pages";
import { getPricing } from "@/features/public/pricing/api/get-pricing";
import { EventPage } from "@/features/public/events/components/event-page";
import { APPLE_APP_ID, SITE_URL } from "@/features/public/shell/config/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getPublicEvent(slug);
  if (!event) return { title: "Event not found — cheevo" };
  return {
    title: `${event.title} — cheevo`,
    description: event.description?.slice(0, 160) ?? undefined,
    alternates: { canonical: `${SITE_URL}/events/${slug}` },
    openGraph: {
      title: event.title,
      url: `${SITE_URL}/events/${slug}`,
      images:
        event.flyer_url && event.flyer_type === "image"
          ? [event.flyer_url]
          : [],
    },
    itunes: { appId: APPLE_APP_ID, appArgument: `${SITE_URL}/events/${slug}` },
  };
}

export default async function Event({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [event, pages, pricing] = await Promise.all([
    getPublicEvent(slug),
    listPublicPages().catch(() => []),
    getPricing(),
  ]);
  if (!event) notFound();
  return (
    <EventPage
      event={event}
      pages={pages}
      appFee={{
        flatMinor: pricing.flatMinor,
        percentageBps: pricing.percentageBps,
      }}
    />
  );
}
