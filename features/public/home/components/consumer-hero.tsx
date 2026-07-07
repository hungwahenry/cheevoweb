import { DownloadCta } from "@/features/public/shell/components/download-cta"
import { SiteHeader } from "@/features/public/shell/components/site-header"
import { RotatingEventType } from "@/features/public/home/components/rotating-event-type"
import { PEOPLE_PHOTOS } from "@/features/public/home/components/people-photos"
import { PhotoWall } from "@/features/public/home/components/photo-wall"

export function ConsumerHero() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-background">
      <div className="hero-photos absolute inset-0 md:left-[38%]">
        <div className="absolute inset-0 md:scale-[1.15] md:rotate-[-5deg]">
          <PhotoWall photos={PEOPLE_PHOTOS} />
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col">
        <SiteHeader />

        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-6 pb-20 md:justify-center md:px-10">
          <div className="max-w-xl">
            <h1 className="text-[clamp(2.75rem,7vw,5rem)] leading-[0.95] font-black tracking-[-0.04em]">
              <span className="whitespace-nowrap">
                Find <RotatingEventType />
              </span>
              <br />
              Get tickets.
            </h1>
            <p className="mt-6 max-w-md text-base text-foreground/70 md:text-lg">
              Browse concerts, parties and game nights near you, book in
              seconds, and show your ticket at the door.
            </p>
            <DownloadCta className="mt-9" />
          </div>
        </div>
      </div>
    </section>
  )
}
