import type { Metadata } from "next";
import { listPublicPages } from "@/features/marketing/api/list-pages";
import { ConsumerHero } from "@/features/marketing/components/landing/consumer-hero";
import { ProductStory } from "@/features/marketing/components/landing/product-story";
import { SiteOutro } from "@/features/marketing/components/shell/site-outro";

export const metadata: Metadata = {
  title: "cheevo — Find what's on near you",
  description:
    "Concerts, parties, popups and more — discover events near you, RSVP or grab a ticket, and walk in with it in your pocket.",
};

export default async function Home() {
  const pages = await listPublicPages().catch(() => []);

  return (
    <>
      <ConsumerHero />
      <ProductStory />
      <SiteOutro
        pages={pages}
        title="Never miss what's on."
        body="Get cheevo to see what's happening near you and grab your spot."
        crossLink={{ href: "/organizers", label: "For organizers" }}
      />
    </>
  );
}
