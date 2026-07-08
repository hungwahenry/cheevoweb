import type { Metadata } from "next"
import { listFeed } from "@/features/public/feed/api/list-feed"
import { FeedList } from "@/features/public/feed/components/feed-list"
import { listPublicPages } from "@/features/public/pages/api/list-pages"
import { SiteFooterBar } from "@/features/public/shell/components/site-footer-bar"
import { SiteHeader } from "@/features/public/shell/components/site-header"
import { SITE_URL } from "@/features/public/shell/config/site"

export const metadata: Metadata = {
  title: "Events on Cheevo — What's on near you",
  description:
    "Browse upcoming concerts, parties, game nights and more. Grab your ticket and walk in with it in your pocket.",
  alternates: { canonical: `${SITE_URL}/events` },
}

export default async function Events() {
  const [feed, pages] = await Promise.all([
    listFeed().catch(() => null),
    listPublicPages().catch(() => []),
  ])

  return (
    <main className="flex min-h-svh flex-col bg-background text-foreground">
      <SiteHeader />

      <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-14 md:px-10 md:py-16">
        <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] font-black tracking-[-0.035em]">
          What&apos;s on
        </h1>
        <p className="mt-4 max-w-xl text-base text-foreground/65 md:text-lg">
          Upcoming events near you — tap any one to see the details and grab a
          ticket.
        </p>

        <div className="mt-10">
          {feed ? (
            <FeedList initial={feed} />
          ) : (
            <div className="rounded-2xl border border-border bg-muted/40 p-10 text-center text-sm text-foreground/60">
              We couldn&apos;t load events right now. Please try again shortly.
            </div>
          )}
        </div>
      </div>

      <div className="pb-12">
        <SiteFooterBar pages={pages} crossLink={{ href: "/", label: "Home" }} />
      </div>
    </main>
  )
}
