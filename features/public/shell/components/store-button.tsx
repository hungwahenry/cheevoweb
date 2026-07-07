import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  type AppTarget,
  STORE_LINKS,
} from "@/features/public/shell/config/store-links"
import {
  ApplePhoneIcon,
  GooglePhoneIcon,
} from "@/features/public/shell/components/icons"

type Store = "apple" | "google"

const COPY: Record<Store, { eyebrow: string; label: string }> = {
  apple: { eyebrow: "Download on the", label: "App Store" },
  google: { eyebrow: "Get it on", label: "Google Play" },
}

export function StoreButton({
  store,
  app = "attendee",
  className,
}: {
  store: Store
  app?: AppTarget
  className?: string
}) {
  const meta = COPY[store]
  const href = STORE_LINKS[app][store]
  const Icon = store === "apple" ? ApplePhoneIcon : GooglePhoneIcon

  return (
    <Link
      href={href || "#"}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full bg-foreground px-5 py-3 text-background transition-transform hover:scale-[1.02]",
        className
      )}
    >
      <Icon className="size-5 shrink-0" />
      <span className="flex flex-col leading-none whitespace-nowrap">
        <span className="text-[9px] tracking-[0.14em] uppercase opacity-65">
          {meta.eyebrow}
        </span>
        <span className="mt-0.5 text-[15px] font-medium tracking-tight">
          {meta.label}
        </span>
      </span>
    </Link>
  )
}
