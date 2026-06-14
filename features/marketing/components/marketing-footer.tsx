import Link from "next/link";
import type { PublicPageSummary } from "../types";
import { StoreButtons } from "./store-buttons";
import { Wordmark } from "./wordmark";

export function MarketingFooter({ pages }: { pages: PublicPageSummary[] }) {
  return (
    <footer className="mt-24 border-t border-foreground/10 px-6 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 md:flex-row md:justify-between">
        <div className="flex max-w-sm flex-col gap-4">
          <Wordmark />
          <p className="text-sm text-foreground/55">
            Every event, in one app. Discover, RSVP, and walk in with your ticket
            in your pocket.
          </p>
          <StoreButtons className="mt-1" />
        </div>

        <nav className="flex flex-col gap-2.5 text-sm text-foreground/65">
          <span className="text-xs font-semibold uppercase tracking-wider text-foreground/40">
            Cheevo
          </span>
          <Link href="/" className="transition-colors hover:text-foreground">
            For attendees
          </Link>
          <Link
            href="/organizers"
            className="transition-colors hover:text-foreground"
          >
            For organizers
          </Link>
          {pages.map((page) => (
            <Link
              key={page.slug}
              href={`/pages/${page.slug}`}
              className="transition-colors hover:text-foreground"
            >
              {page.title}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-10 w-full max-w-6xl border-t border-foreground/10 pt-6 text-xs text-foreground/45">
        © {new Date().getFullYear()} cheevo
      </div>
    </footer>
  );
}
