import type { Metadata } from "next"
import Link from "next/link"
import { listPublicPages } from "@/features/public/pages/api/list-pages"
import { SiteFooterBar } from "@/features/public/shell/components/site-footer-bar"
import { SiteHeader } from "@/features/public/shell/components/site-header"
import {
  CONTACT_EMAIL,
  WHATSAPP_URL,
} from "@/features/public/shell/config/site"

export const metadata: Metadata = {
  title: "Contact cheevo",
  description:
    "Talk to the cheevo team — organiser partnerships, support, or press.",
}

export default async function Contact() {
  const pages = await listPublicPages().catch(() => [])

  return (
    <main className="flex min-h-svh flex-col bg-background text-foreground">
      <SiteHeader />

      <div className="mx-auto w-full max-w-2xl flex-1 px-6 py-16 md:py-24">
        <h1 className="text-[clamp(2.25rem,6vw,3.5rem)] leading-[1.02] font-black tracking-[-0.035em]">
          Get in touch
        </h1>
        <p className="mt-5 max-w-md text-base text-foreground/65 md:text-lg">
          Hosting an event and want to sell on cheevo? Need a hand, or want to
          partner up? We&apos;d love to hear from you.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="rounded-2xl border border-border p-6 transition-colors hover:bg-muted/40"
          >
            <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">
              Email
            </p>
            <p className="mt-2 font-semibold">{CONTACT_EMAIL}</p>
            <p className="mt-1 text-sm text-foreground/55">
              Partnerships, support &amp; press.
            </p>
          </a>
          {WHATSAPP_URL ? (
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-border p-6 transition-colors hover:bg-muted/40"
            >
              <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">
                WhatsApp
              </p>
              <p className="mt-2 font-semibold">Message us</p>
              <p className="mt-1 text-sm text-foreground/55">
                Fastest for organiser enquiries.
              </p>
            </a>
          ) : null}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-muted/40 p-6">
          <p className="font-semibold">Are you an organiser?</p>
          <p className="mt-2 text-sm text-foreground/65">
            You create and manage events in the cheevo Organizer app. See how it
            works on the{" "}
            <Link href="/organizers" className="text-primary hover:underline">
              organizers page
            </Link>{" "}
            and{" "}
            <Link href="/pricing" className="text-primary hover:underline">
              pricing
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="pb-12">
        <SiteFooterBar pages={pages} crossLink={{ href: "/", label: "Home" }} />
      </div>
    </main>
  )
}
