import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicEvent } from "@/features/marketing/api/get-event";
import { EventView } from "@/features/marketing/components/event-view";

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
    openGraph: {
      title: event.title,
      images:
        event.flyer_url && event.flyer_type === "image"
          ? [event.flyer_url]
          : [],
    },
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getPublicEvent(slug);
  if (!event) notFound();
  return <EventView event={event} />;
}
