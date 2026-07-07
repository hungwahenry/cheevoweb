import type { Metadata } from "next"
import { listPublicPages } from "@/features/public/pages/api/list-pages"
import { SiteFooterBar } from "@/features/public/shell/components/site-footer-bar"
import { SiteHeader } from "@/features/public/shell/components/site-header"
import { StoreButton } from "@/features/public/shell/components/store-button"
import { StoreRedirect } from "@/features/public/shell/components/store-redirect"

export const metadata: Metadata = {
  title: "Get the Cheevo app",
  description:
    "Download Cheevo to discover events near you, RSVP or grab a ticket, and walk in with it in your pocket.",
}

export default async function Download({
  searchParams,
}: {
  searchParams: Promise<{ app?: string }>
}) {
  const [pages, params] = await Promise.all([
    listPublicPages().catch(() => []),
    searchParams,
  ])
  const isOrganizer = params.app === "organizer"
  const app = isOrganizer ? "organizer" : "attendee"

  return (
    <main className="flex min-h-svh flex-col bg-background text-foreground">
      <StoreRedirect app={app} />
      <SiteHeader />

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="text-[clamp(2.25rem,6vw,3.5rem)] leading-[1.02] font-black tracking-[-0.035em]">
          {isOrganizer ? "Get the Cheevo Organizer app" : "Get the Cheevo app"}
        </h1>
        <p className="mt-5 max-w-md text-base text-foreground/65 md:text-lg">
          {isOrganizer
            ? "Create events, sell tickets, scan people in at the door, and cash out — all from your phone."
            : "Discover events near you, RSVP or grab a ticket, and walk in with it in your pocket."}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <StoreButton store="apple" app={app} />
          <StoreButton store="google" app={app} />
        </div>
      </div>

      <div className="pb-12">
        <SiteFooterBar pages={pages} crossLink={{ href: "/", label: "Home" }} />
      </div>
    </main>
  )
}
