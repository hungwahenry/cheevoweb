import { cn } from "@/lib/utils"
import type { AppTarget } from "@/features/public/shell/config/store-links"
import { StoreButton } from "@/features/public/shell/components/store-button"

export function AppCta({
  image,
  imageAlt = "",
  title,
  body,
  app = "attendee",
  className,
}: {
  image: string
  imageAlt?: string
  title: string
  body: string
  app?: AppTarget
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex overflow-hidden rounded-2xl border border-border bg-muted/40",
        className
      )}
    >
      <div className="relative w-32 shrink-0 overflow-hidden sm:w-44">
        <img
          src={image}
          alt={imageAlt}
          className="absolute inset-x-0 top-0 w-full"
        />
      </div>
      <div className="flex-1 p-5 sm:p-8">
        <h2 className="text-lg font-bold tracking-tight sm:text-xl md:text-2xl">
          {title}
        </h2>
        <p className="mt-1.5 max-w-md text-xs text-foreground/60 sm:mt-2 sm:text-sm">
          {body}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2.5 sm:mt-5 sm:gap-3">
          <StoreButton store="apple" app={app} />
          <StoreButton store="google" app={app} />
        </div>
      </div>
    </div>
  )
}
