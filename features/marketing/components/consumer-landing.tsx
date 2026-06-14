import { FinalCta } from "./final-cta";
import { Hero } from "./hero";
import { ShowcaseRow } from "./showcase-row";

export function ConsumerLanding() {
  return (
    <>
      <Hero
        titleLines={["Every event.", "In one app."]}
        body="Discover what's happening near you, RSVP in a tap, and walk in with your ticket in your pocket."
        screenshot="/screenshots/app/event-detail.png"
        alt="A cheevo event detail screen"
      />

      <ShowcaseRow
        eyebrow="Discover"
        title="What's happening, right now"
        body="A feed tuned to your city and your taste — day parties, concerts, popups, and the nights you'd otherwise have missed."
        src="/screenshots/app/feed.png"
        alt="cheevo home feed"
        reverse
      />
      <ShowcaseRow
        eyebrow="Tickets"
        title="Your ticket, in your pocket"
        body="Buy in seconds and get a QR that scans at the door. No screenshots, no digging through email."
        src="/screenshots/app/tickets.png"
        alt="cheevo tickets screen"
      />
      <ShowcaseRow
        eyebrow="For you"
        title="Tuned to your taste"
        body="Pick your interests once and cheevo surfaces the events you'll actually want to be at."
        src="/screenshots/app/interests.png"
        alt="cheevo interests screen"
        reverse
      />
      <ShowcaseRow
        eyebrow="Search"
        title="Find your next night out"
        body="Search events, organisers, and venues — and follow the ones worth keeping up with."
        src="/screenshots/app/search.png"
        alt="cheevo search screen"
      />

      <FinalCta
        title="Get the app"
        body="Join the people who never miss a good night out."
      />
    </>
  );
}
