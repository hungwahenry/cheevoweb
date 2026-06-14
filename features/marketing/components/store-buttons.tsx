import Link from "next/link";
import { cn } from "@/lib/utils";
import { STORE_LINKS } from "../config/store-links";
import { ApplePhoneIcon, GooglePhoneIcon } from "./icons";

const STORES = [
  {
    key: "apple" as const,
    href: STORE_LINKS.apple,
    eyebrow: "Download on the",
    label: "App Store",
    Icon: ApplePhoneIcon,
  },
  {
    key: "google" as const,
    href: STORE_LINKS.google,
    eyebrow: "Get it on",
    label: "Google Play",
    Icon: GooglePhoneIcon,
  },
];

export function StoreButtons({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {STORES.map(({ key, href, eyebrow, label, Icon }) => (
        <Link
          key={key}
          href={href || "#"}
          className="inline-flex items-center gap-2.5 rounded-full bg-primary px-5 py-3 text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Icon className="size-5 shrink-0" />
          <span className="flex flex-col leading-none">
            <span className="text-[9px] uppercase tracking-[0.14em] opacity-65">
              {eyebrow}
            </span>
            <span className="mt-0.5 text-[15px] font-medium tracking-tight">
              {label}
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
