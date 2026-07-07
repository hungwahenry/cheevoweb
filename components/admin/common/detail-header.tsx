import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DetailHeaderProps {
  title: string
  subtitle?: string | null
  thumbnail?: string | null
  fallback?: string
  badges?: React.ReactNode
  actions?: React.ReactNode
  square?: boolean
}

/** Shared 360 header: thumbnail + title + subtitle + status badges, with an actions slot. */
export function DetailHeader({
  title,
  subtitle,
  thumbnail,
  fallback,
  badges,
  actions,
  square,
}: DetailHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex items-center gap-4">
        {(thumbnail !== undefined || fallback) && (
          <Avatar className={square ? "size-14 rounded-md" : "size-14"}>
            <AvatarImage
              src={thumbnail ?? undefined}
              alt=""
              className="object-cover"
            />
            <AvatarFallback className={square ? "rounded-md" : undefined}>
              {(fallback ?? title).slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          {badges && (
            <div className="flex items-center gap-2 pt-1">{badges}</div>
          )}
        </div>
      </div>
      {actions}
    </div>
  )
}
