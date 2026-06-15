import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublicEvent } from "@/features/marketing/api/get-event";
import { listPublicPages } from "@/features/marketing/api/list-pages";
import { EventPage } from "@/features/marketing/components/content/event-page";

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

export default async function Event({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [event, pages] = await Promise.all([
    getPublicEvent(slug),
    listPublicPages().catch(() => []),
  ]);
  if (!event) notFound();
  return <EventPage event={event} pages={pages} />;
}
