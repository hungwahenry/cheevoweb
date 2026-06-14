import {
  Banknote,
  Box,
  Building2,
  CalendarDays,
  CreditCard,
  Megaphone,
  MessageSquare,
  ShoppingCart,
  Ticket,
  User,
} from "lucide-react";
import Link from "next/link";
import type { ComponentType } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { EntityRef } from "@/lib/api/types";

const TYPE_ICON: Record<string, ComponentType<{ className?: string }>> = {
  user: User,
  organisation: Building2,
  event: CalendarDays,
  order: ShoppingCart,
  payment: CreditCard,
  payout: Banknote,
  comment: MessageSquare,
  broadcast: Megaphone,
  ticket: Ticket,
};

/** Backend deep links are `/admin/...`; the panel serves them under `/dashboard/...`. */
function entityHref(ref: EntityRef): string | null {
  if (!ref.deep_link) return null;
  return ref.deep_link.replace(/^\/admin\//, "/dashboard/");
}

/** The real image (flyer/logo/avatar) when present, otherwise a per-type icon — never initials. */
function EntityThumb({ entity }: { entity: EntityRef }) {
  const Icon = TYPE_ICON[entity.type] ?? Box;

  return (
    <Avatar className="size-9 rounded-md">
      <AvatarImage
        src={entity.thumbnail ?? undefined}
        alt=""
        className="object-cover"
      />
      <AvatarFallback className="rounded-md">
        <Icon className="text-muted-foreground size-4" />
      </AvatarFallback>
    </Avatar>
  );
}

interface EntityRefItemProps {
  entity: EntityRef;
  sublabel?: string | null;
  trailing?: React.ReactNode;
}

export function EntityRefItem({
  entity,
  sublabel,
  trailing,
}: EntityRefItemProps) {
  const href = entityHref(entity);

  const body = (
    <div className="flex min-w-0 items-center gap-2.5">
      <EntityThumb entity={entity} />
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{entity.label}</p>
        {(sublabel ?? entity.sublabel) && (
          <p className="text-muted-foreground truncate text-xs">
            {sublabel ?? entity.sublabel}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-between gap-3">
      {href ? (
        <Link
          href={href}
          className="hover:bg-accent -m-1.5 min-w-0 flex-1 rounded-md p-1.5"
        >
          {body}
        </Link>
      ) : (
        <div className="min-w-0 flex-1 p-1.5">{body}</div>
      )}
      {trailing}
    </div>
  );
}
