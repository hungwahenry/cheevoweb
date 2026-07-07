import { Sparkles } from "lucide-react"
import { formatTimeRange } from "@/lib/format"
import type { PublicFeature } from "@/features/public/events/types"

export function EventFeatures({
  features,
  timezone,
}: {
  features: PublicFeature[]
  timezone: string | null
}) {
  if (features.length === 0) return null

  return (
    <section className="mt-12">
      <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
        <Sparkles className="size-4 text-foreground/40" />
        What&apos;s included
      </h2>
      <div className="mt-5 flex flex-col gap-6">
        {features.map((feature) => {
          const time = formatTimeRange(
            feature.starts_at,
            feature.ends_at,
            timezone
          )
          return (
            <div key={feature.id} className="flex gap-4">
              {feature.image_url ? (
                <img
                  src={feature.image_url}
                  alt=""
                  className="size-24 shrink-0 rounded-2xl border border-border object-cover"
                />
              ) : null}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <p className="font-semibold">{feature.title}</p>
                  {time ? (
                    <p className="text-xs font-medium text-primary">{time}</p>
                  ) : null}
                </div>
                {feature.description ? (
                  <p className="mt-1 text-sm leading-relaxed whitespace-pre-line text-foreground/65">
                    {feature.description}
                  </p>
                ) : null}
                {feature.link ? (
                  <a
                    href={feature.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1.5 inline-block text-sm font-medium text-primary hover:underline"
                  >
                    Learn more →
                  </a>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
