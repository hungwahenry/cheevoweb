import Link from "next/link";
import { cn } from "@/lib/utils";
import { STORE_LINKS } from "../../config/store-links";
import { ApplePhoneIcon, GooglePhoneIcon } from "./icons";

type Store = "apple" | "google";

const COPY: Record<Store, { eyebrow: string; label: string; href: string }> = {
  apple: { eyebrow: "Download on the", label: "App Store", href: STORE_LINKS.apple },
  google: { eyebrow: "Get it on", label: "Google Play", href: STORE_LINKS.google },
};

export function StoreButton({
  store,
  className,
}: {
  store: Store;
  className?: string;
}) {
  const meta = COPY[store];
  const Icon = store === "apple" ? ApplePhoneIcon : GooglePhoneIcon;

  return (
    <Link
      href={meta.href || "#"}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full bg-foreground px-5 py-3 text-background transition-transform hover:scale-[1.02]",
        className,
      )}
    >
      <Icon className="size-5 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="text-[9px] uppercase tracking-[0.14em] opacity-65">
          {meta.eyebrow}
        </span>
        <span className="mt-0.5 text-[15px] font-medium tracking-tight">
          {meta.label}
        </span>
      </span>
    </Link>
  );
}
