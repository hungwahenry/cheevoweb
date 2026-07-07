import { DownloadCta } from "@/features/public/shell/components/download-cta"
import { SiteHeader } from "@/features/public/shell/components/site-header"
import { PEOPLE_PHOTOS } from "@/features/public/home/components/people-photos"
import { PhotoWall } from "@/features/public/home/components/photo-wall"

export function ConsumerHero() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden">
      <PhotoWall photos={PEOPLE_PHOTOS} />
      <div className="absolute inset-0 bg-background/[0.78]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background md:h-56" />

      <div className="relative z-10 flex flex-1 flex-col">
        <SiteHeader />

        <div className="flex flex-1 flex-col items-center justify-center px-6 pb-16 text-center">
          <h1 className="max-w-4xl text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.98] font-black tracking-[-0.04em]">
            Find events. Get tickets.
          </h1>
          <p className="mt-6 max-w-xl text-base text-foreground/70 md:text-lg">
            Browse concerts, parties and game nights near you, book in seconds,
            and show your ticket at the door.
          </p>
          <DownloadCta className="mt-9 justify-center" />
        </div>

        <div className="pb-8 text-center text-[11px] font-medium tracking-[0.2em] text-foreground/40 uppercase">
          Scroll to explore
        </div>
      </div>
    </section>
  )
}
