import {
  Banknote,
  LineChart,
  Megaphone,
  ScanLine,
  Ticket,
  Users,
} from "lucide-react"

const TOOLS = [
  {
    Icon: Ticket,
    title: "Sell tickets",
    body: "Tiers, presale windows, per-person limits — priced the way your event actually runs.",
  },
  {
    Icon: ScanLine,
    title: "Scan at the door",
    body: "Turn your phone into a scanner. Every ticket checked and marked used the moment it's scanned.",
  },
  {
    Icon: Banknote,
    title: "Get paid",
    body: "Sales land in your balance as they happen. Withdraw straight to your bank — no 30-day hold.",
  },
  {
    Icon: Megaphone,
    title: "Broadcast",
    body: "Doors info, lineup changes, last call — email everyone with a ticket in a couple of taps.",
  },
  {
    Icon: Users,
    title: "Your team",
    body: "Add the people working the event so they can manage tickets and run the door with you.",
  },
  {
    Icon: LineChart,
    title: "Live numbers",
    body: "Revenue, tickets sold, and RSVPs — updating as they happen, right on your phone.",
  },
]

export function ToolkitGrid() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28">
      <div className="max-w-2xl">
        <p className="text-[11px] font-medium tracking-[0.22em] text-foreground/55 uppercase">
          One app, the whole job
        </p>
        <h2 className="mt-4 text-[clamp(1.875rem,4vw,3rem)] leading-[1.1] font-bold tracking-[-0.025em]">
          Everything you need to run your event.
        </h2>
      </div>

      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map(({ Icon, title, body }) => (
          <div
            key={title}
            className="flex flex-col gap-4 bg-background p-6 md:p-8"
          >
            <Icon className="size-5 text-primary" strokeWidth={1.75} />
            <h3 className="text-lg font-bold tracking-tight">{title}</h3>
            <p className="text-sm leading-relaxed text-foreground/60">{body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
