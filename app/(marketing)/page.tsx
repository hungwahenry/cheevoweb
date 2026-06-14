import type { Metadata } from "next";
import { ConsumerLanding } from "@/features/marketing/components/consumer-landing";

export const metadata: Metadata = {
  title: "cheevo — Every event, in one app",
  description:
    "Discover what's happening near you, RSVP in a tap, and walk in with your ticket in your pocket.",
};

export default function Home() {
  return <ConsumerLanding />;
}
