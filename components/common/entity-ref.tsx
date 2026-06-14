import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { EntityRef } from "@/lib/api/types";

/** Backend deep links are `/admin/...`; the panel serves them under `/dashboard/...`. */
function entityHref(ref: EntityRef): string | null {
  if (!ref.deep_link) return null;
  return ref.deep_link.replace(/^\/admin\//, "/dashboard/");
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
    <div className="flex min-w-0 items-center gap-2">
      <Avatar className="size-7">
        <AvatarImage src={entity.thumbnail ?? undefined} alt="" />
        <AvatarFallback className="text-xs">
          {entity.label.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
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
