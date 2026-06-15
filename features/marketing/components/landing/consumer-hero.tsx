import { DownloadCta } from "../shell/download-cta";
import { SiteHeader } from "../shell/site-header";
import { PEOPLE_PHOTOS } from "./people-photos";
import { PhotoWall } from "./photo-wall";

export function ConsumerHero() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden">
      <PhotoWall photos={PEOPLE_PHOTOS} />
      <div className="absolute inset-0 bg-background/[0.78]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background md:h-56" />

      <div className="relative z-10 flex flex-1 flex-col">
        <SiteHeader />

        <div className="flex flex-1 flex-col items-center justify-center px-6 pb-16 text-center">
          <h1 className="max-w-4xl text-[clamp(2.75rem,8vw,5.5rem)] font-black leading-[0.98] tracking-[-0.04em]">
            Find what&apos;s on. Be there.
          </h1>
          <p className="mt-6 max-w-xl text-base text-foreground/70 md:text-lg">
            From concerts to game nights — see what&apos;s happening near you,
            RSVP or grab a ticket, and walk in with it in your pocket.
          </p>
          <DownloadCta className="mt-9 justify-center" />
        </div>

        <div className="pb-8 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/40">
          Scroll to explore
        </div>
      </div>
    </section>
  );
}
