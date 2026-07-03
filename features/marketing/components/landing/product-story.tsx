"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Scene = {
  shot: string;
  eyebrow: string;
  title: string;
  body: string;
};

const SCENES: Scene[] = [
  {
    shot: "/screenshots/app/feed.png",
    eyebrow: "Discover",
    title: "What's happening, right now",
    body: "A feed of the concerts, popups, game nights and parties near you — tuned to what you're into.",
  },
  {
    shot: "/screenshots/app/event-detail.png",
    eyebrow: "Decide",
    title: "Everything about the event, one screen",
    body: "Lineup, location, tickets, who's going. RSVP for free or grab a ticket in a couple of taps.",
  },
  {
    shot: "/screenshots/app/comments.png",
    eyebrow: "Discuss",
    title: "Join the conversation",
    body: "Comments live right on the event — hype the lineup, ask what time doors open, and catch the buzz before you go.",
  },
  {
    shot: "/screenshots/app/tickets.png",
    eyebrow: "Walk in",
    title: "Your ticket, in your pocket",
    body: "A QR that scans at the door. No screenshots, no digging through email — just walk in.",
  },
];

export function ProductStory() {
  const [active, setActive] = useState(0);
  const markers = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = markers.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) setActive(index);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    for (const marker of markers.current) {
      if (marker) observer.observe(marker);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="md:grid md:grid-cols-2 md:gap-16">
        <div className="hidden md:block">
          <div className="sticky top-0 flex h-svh items-center justify-center">
            <div className="relative h-[80vh] max-h-[780px] w-full max-w-[340px]">
              {SCENES.map((scene, index) => (
                <img
                  key={scene.shot}
                  src={scene.shot}
                  alt=""
                  className={cn(
                    "absolute inset-0 size-full object-contain transition-opacity duration-500 motion-reduce:transition-none",
                    index === active ? "opacity-100" : "opacity-0",
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div>
          {SCENES.map((scene, index) => (
            <div
              key={scene.title}
              ref={(el) => {
                markers.current[index] = el;
              }}
              className="flex flex-col justify-center py-12 md:min-h-svh md:py-0"
            >
              <img
                src={scene.shot}
                alt=""
                className="mx-auto mb-8 w-[240px] max-w-[68%] md:hidden"
              />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {scene.eyebrow}
              </span>
              <h3 className="mt-3 text-4xl font-black leading-[1.02] tracking-[-0.035em] md:text-6xl">
                {scene.title}
              </h3>
              <p className="mt-4 max-w-md text-foreground/65 md:text-lg">
                {scene.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
