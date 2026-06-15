import type { Pricing } from "../../types";
import { DownloadCta } from "../shell/download-cta";
import { OrganizerHeader } from "../shell/organizer-header";

export function OrganizerHero({ pricing }: { pricing: Pricing }) {
  const stats = [
    { value: "₦0", label: "to get started" },
    { value: `T+${pricing.holdWindowDays} days`, label: "to your bank" },
    { value: "Your phone", label: "is the box office" },
  ];

  return (
    <section className="relative flex min-h-svh flex-col">
      <OrganizerHeader />

      <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-6 py-12 md:grid-cols-2 md:gap-10 md:px-10">
        <div className="flex flex-col">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/55">
            Cheevo for organizers
          </p>
          <h1 className="mt-5 text-[clamp(2.5rem,5.5vw,4.25rem)] font-black leading-[1] tracking-[-0.04em]">
            Sell tickets. Get paid.{" "}
            <span className="text-primary">Move on.</span>
          </h1>
          <p className="mt-6 max-w-md text-base text-foreground/65 md:text-lg">
            Create an event, sell tickets, scan people in at the door, and cash
            out — all from your phone.
          </p>
          <DownloadCta className="mt-8" />

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
  );
}
