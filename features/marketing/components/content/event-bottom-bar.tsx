import { formatEventPrice } from "@/lib/format";
import type { PublicEvent } from "../../types";
import { StoreButton } from "../shell/store-button";

export function EventBottomBar({ event }: { event: PublicEvent }) {
  const price = formatEventPrice(
    event.tickets_min_price,
    event.tickets_max_price,
    event.currency,
  );

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-3xl items-center gap-3 px-6 py-3">
        <div className="hidden min-w-0 flex-1 sm:block">
          <p className="text-[11px] uppercase tracking-[0.14em] text-foreground/45">
            Tickets
          </p>
          <p className="truncate font-semibold">{price}</p>
        </div>
        <StoreButton store="apple" className="flex-1 justify-center sm:flex-none" />
        <StoreButton
          store="google"
          className="flex-1 justify-center sm:flex-none"
        />
      </div>
    </div>
  );
}
