import { formatEventPrice } from "@/lib/format";
import type { PublicEvent } from "../../types";
import { isEventEnded } from "../../event-status";
import { StoreButton } from "../shell/store-button";

export function EventBottomBar({ event }: { event: PublicEvent }) {
  const ended = isEventEnded(event);
  const price = formatEventPrice(
    event.tickets_min_price,
    event.tickets_max_price,
    event.currency,
  );

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 px-6 py-3 sm:flex-row sm:items-center">
        <div className="min-w-0 sm:flex-1">
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/45">
            {ended ? "Event" : "Tickets"}
          </p>
          <p className="truncate font-semibold">
            {ended ? "This event has ended" : price}
          </p>
        </div>
        {ended ? null : (
          <div className="flex gap-2 sm:gap-3">
            <StoreButton
              store="apple"
              className="flex-1 justify-center sm:flex-none"
            />
            <StoreButton
              store="google"
              className="flex-1 justify-center sm:flex-none"
            />
          </div>
        )}
      </div>
    </div>
  );
}
