import { Check } from "lucide-react"

const OLD_WAY = [
  "Tickets tracked in a spreadsheet",
  "A WhatsApp broadcast list",
  "Cash and IOUs at the door",
  "A borrowed QR scanner",
  "“Did you pay?” in your DMs",
]

const NEW_WAY = [
  "Create the event and price the tickets",
  "Sell and track every order in real time",
  "Scan people in from your own phone",
  "Watch the money land in your balance",
]

export function ReplacesSection() {
  return (
    <section className="bg-muted/40 px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <p className="text-[11px] font-medium tracking-[0.22em] text-foreground/45 uppercase">
            Before cheevo
          </p>
          <h2 className="mt-4 text-[clamp(1.875rem,4vw,3rem)] leading-[1.1] font-bold tracking-[-0.025em] text-foreground/45">
            A spreadsheet, a group chat, and a cashbox.
          </h2>
          <ul className="mt-8 flex flex-col gap-3.5">
            {OLD_WAY.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-foreground/40"
              >
                <span className="h-px w-4 shrink-0 bg-foreground/25" />
                <span className="line-through decoration-foreground/25">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[11px] font-medium tracking-[0.22em] text-primary uppercase">
            With cheevo
          </p>
          <h2 className="mt-4 text-[clamp(1.875rem,4vw,3rem)] leading-[1.1] font-bold tracking-[-0.025em]">
            One app. The whole event.
          </h2>
          <ul className="mt-8 flex flex-col gap-3.5">
            {NEW_WAY.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                <span className="text-foreground/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
