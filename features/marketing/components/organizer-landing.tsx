import type { Pricing } from "../types";
import { FinalCta } from "./final-cta";
import { Hero } from "./hero";
import { PricingSection } from "./pricing";
import { ShowcaseRow } from "./showcase-row";

export function OrganizerLanding({ pricing }: { pricing: Pricing }) {
  return (
    <>
      <Hero
        titleLines={["Sell tickets.", "Get paid.", "Move on."]}
        body="Create an event, sell tickets, scan people in at the door, and cash out — all from your phone."
        screenshot="/screenshots/org/dashboard.png"
        alt="cheevo organizer dashboard"
      />

      <ShowcaseRow
        eyebrow="At the door"
        title="Scan. Verify. Wave them through."
        body="Turn your phone into a scanner. Every ticket is checked and marked used in real time — no double entries, no clipboard."
        src="/screenshots/org/scanner.png"
        alt="cheevo door scanner"
        reverse
      />
      <ShowcaseRow
        eyebrow="Broadcasts"
        title="One message, every attendee"
        body="Doors info, lineup changes, last call — email everyone who has a ticket or RSVP'd in a couple of taps."
        src="/screenshots/org/broadcasts.png"
        alt="cheevo broadcasts"
      />
      <ShowcaseRow
        eyebrow="Tickets"
        title="Price it the way it actually runs"
        body="Tiers, presale windows, per-person limits — set general entry, VIP tables, and late entry however your night works."
        src="/screenshots/org/tickets.png"
        alt="cheevo ticket setup"
        reverse
      />
      <ShowcaseRow
        eyebrow="Payouts"
        title="Cash out fast"
        body="Watch sales land in your balance and withdraw to your bank — no waiting until the end of the month."
        src="/screenshots/org/payouts.png"
        alt="cheevo payouts"
      />
      <ShowcaseRow
        eyebrow="Team"
        title="Bring your team along"
        body="Add the people working the event so they can help manage tickets and scan at the door."
        src="/screenshots/org/team.png"
        alt="cheevo team"
        reverse
      />

      <PricingSection pricing={pricing} />

      <FinalCta
        title="Your next event is one tap away"
        body="Download cheevo and start selling tickets today."
      />
    </>
  );
}
