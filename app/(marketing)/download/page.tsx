import type { Metadata } from "next";
import { listPublicPages } from "@/features/marketing/api/list-pages";
import { SiteFooterBar } from "@/features/marketing/components/shell/site-footer-bar";
import { SiteHeader } from "@/features/marketing/components/shell/site-header";
import { StoreButton } from "@/features/marketing/components/shell/store-button";

export const metadata: Metadata = {
  title: "Get the cheevo app",
  description:
    "Download cheevo to discover events near you, RSVP or grab a ticket, and walk in with it in your pocket.",
};

export default async function Download() {
  const pages = await listPublicPages().catch(() => []);

  return (
    <main className="flex min-h-svh flex-col bg-background text-foreground">
      <SiteHeader />

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="text-[clamp(2.25rem,6vw,3.5rem)] font-black leading-[1.02] tracking-[-0.035em]">
          Get the cheevo app
        </h1>
        <p className="mt-5 max-w-md text-base text-foreground/65 md:text-lg">
          Discover events near you, RSVP or grab a ticket, and walk in with it
          in your pocket.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <StoreButton store="apple" />
          <StoreButton store="google" />
        </div>
      </div>

      <div className="pb-12">
        <SiteFooterBar pages={pages} crossLink={{ href: "/", label: "Home" }} />
      </div>
    </main>
  );
}
