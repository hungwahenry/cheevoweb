import { Sparkles } from "lucide-react";
import type { PublicFeature } from "../../types";

export function EventFeatures({ features }: { features: PublicFeature[] }) {
  if (features.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="flex items-center gap-2 text-lg font-semibold tracking-tight">
        <Sparkles className="size-4 text-foreground/40" />
        What&apos;s included
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex aspect-square flex-col overflow-hidden rounded-2xl border border-border"
          >
            {feature.image_url ? (
              <img
                src={feature.image_url}
                alt=""
                className="min-h-0 w-full flex-1 object-cover"
              />
            ) : (
              <div className="min-h-0 w-full flex-1 bg-muted" />
            )}
            <div className="p-3">
              <p className="text-sm font-semibold leading-tight">
                {feature.title}
              </p>
              {feature.description ? (
                <p className="mt-0.5 line-clamp-2 text-xs text-foreground/55">
                  {feature.description}
                </p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
