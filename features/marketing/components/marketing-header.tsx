"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRightUp } from "./icons";
import { Wordmark } from "./wordmark";

export function MarketingHeader() {
  const pathname = usePathname();
  const onOrganizers = pathname?.startsWith("/organizers");
  const cross = onOrganizers
    ? { href: "/", label: "For attendees" }
    : { href: "/organizers", label: "For organizers" };

  return (
    <header className="relative z-20 px-6 py-5 md:py-6">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
        <Wordmark />
        <Link
          href={cross.href}
          className="group inline-flex items-center gap-1.5 text-sm text-foreground/70 transition-colors hover:text-foreground"
        >
          {cross.label}
          <ArrowRightUp className="size-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
        </Link>
      </div>
    </header>
  );
}
