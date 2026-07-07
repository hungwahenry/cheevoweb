import type { Pricing } from "@/features/public/pricing/types"
import { DownloadCta } from "@/features/public/shell/components/download-cta"
import { OrganizerHeader } from "@/features/public/organizers/components/organizer-header"

export function OrganizerHero({ pricing }: { pricing: Pricing }) {
  const stats = [
    { value: "₦0", label: "to get started" },
    { value: `T+${pricing.holdWindowDays} days`, label: "to your bank" },
    { value: "Your phone", label: "is the box office" },
  ]

  return (
    <section className="relative flex min-h-svh flex-col">
      <OrganizerHeader />

      <div className="mx-auto grid w-full max-w-6xl flex-1 items-start gap-10 px-6 pt-4 pb-10 md:grid-cols-2 md:items-center md:gap-10 md:px-10 md:pt-6">
        <div className="flex flex-col">
          <p className="text-[11px] font-medium tracking-[0.22em] text-foreground/55 uppercase">
            Cheevo for organizers
          </p>
          <h1 className="mt-5 text-[clamp(2.5rem,5.5vw,4.25rem)] leading-[1] font-black tracking-[-0.04em]">
            <span className="text-primary">Everything</span> you need to run
            your event.
          </h1>
          <p className="mt-6 max-w-md text-base text-foreground/65 md:text-lg">
            Sell tickets, scan people in at the door, message attendees, and get
            paid — all from your phone.
          </p>
          <DownloadCta app="organizer" className="mt-8" />

          <div className="mt-14 flex flex-wrap items-baseline gap-x-8 gap-y-3">
            {stats.map((stat) => (
              <p key={stat.label} className="flex items-baseline gap-1.5">
                <span className="font-bold tracking-tight text-foreground">
                  {stat.value}
                </span>
                <span className="text-sm text-foreground/55">{stat.label}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <img
            src="/screenshots/org/dashboard.png"
            alt="The cheevo organizer app"
            className="w-[440px] max-w-full"
          />
        </div>
      </div>
    </section>
  )
}
