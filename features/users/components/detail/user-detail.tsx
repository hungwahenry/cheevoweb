"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AuditTrail } from "@/components/common/audit-trail";
import { EntityRefItem } from "@/components/common/entity-ref";
import { StatCard } from "@/components/common/stat-card";
import { formatDate, formatDateTime, formatMoney } from "@/lib/format";
import { useUser } from "../../hooks/detail/use-user";
import { UserActions } from "./user-actions";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function Empty({ children = "None." }: { children?: string }) {
  return <p className="text-muted-foreground text-sm">{children}</p>;
}

export function UserDetail({ id }: { id: string }) {
  const { data: user, isLoading, isError } = useUser(id);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-20 w-full" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !user) {
    return <Empty>This user could not be loaded.</Empty>;
  }

  const name =
    user.profile?.display_name ?? user.profile?.username ?? user.email;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="size-14">
            <AvatarImage src={user.profile?.avatar_url} alt="" />
            <AvatarFallback>{user.email.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h1 className="text-xl font-semibold tracking-tight">{name}</h1>
            <p className="text-muted-foreground text-sm">{user.email}</p>
            <div className="flex items-center gap-2 pt-1">
              <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                {user.role}
              </Badge>
              {user.suspended_at ? (
                <Badge variant="destructive">Suspended</Badge>
              ) : (
                <Badge variant="outline">Active</Badge>
              )}
              {user.profile?.city && (
                <span className="text-muted-foreground text-sm">
                  {user.profile.city}
                </span>
              )}
            </div>
          </div>
        </div>
        <UserActions user={user} />
      </div>

      {user.suspended_at && user.suspended_reason && (
        <Card className="border-destructive/40">
          <CardContent className="text-sm">
            <span className="font-medium">Suspended:</span>{" "}
            {user.suspended_reason}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Orders" value={user.stats.orders_count} />
        <StatCard
          label="Total spent"
          value={formatMoney(user.stats.total_spent_minor)}
        />
        <StatCard label="Tickets" value={user.stats.tickets_held} />
        <StatCard label="RSVPs" value={user.stats.rsvps_count} />
        <StatCard label="Comments" value={user.stats.comments_count} />
        <StatCard label="Sessions" value={user.stats.active_sessions} />
        <StatCard label="Reports against" value={user.stats.reports_against} />
        <StatCard label="Reports filed" value={user.stats.reports_filed} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Section title="Organisations">
          {user.organisations.length ? (
            <div className="space-y-1">
              {user.organisations.map((org) => (
                <EntityRefItem
                  key={org.id}
                  entity={org}
                  trailing={<Badge variant="secondary">{org.role}</Badge>}
                />
              ))}
            </div>
          ) : (
            <Empty>Not a member of any organisation.</Empty>
          )}
        </Section>

        <Section title="Recent orders">
          {user.orders_recent.length ? (
            <div className="space-y-1">
              {user.orders_recent.map((order) => (
                <EntityRefItem
                  key={order.id}
                  entity={order.event}
                  sublabel={formatDate(order.created_at)}
                  trailing={
                    <span className="text-sm font-medium tabular-nums">
                      {formatMoney(order.total_minor)}
                    </span>
                  }
                />
              ))}
            </div>
          ) : (
            <Empty>No orders.</Empty>
          )}
        </Section>

        <Section title="Recent tickets">
          {user.tickets_recent.length ? (
            <div className="space-y-1">
              {user.tickets_recent.map((ticket) => (
                <EntityRefItem
                  key={ticket.id}
                  entity={ticket.event}
                  sublabel={ticket.ticket_name}
                  trailing={<Badge variant="outline">{ticket.status}</Badge>}
                />
              ))}
            </div>
          ) : (
            <Empty>No tickets.</Empty>
          )}
        </Section>

        <Section title="Sessions">
          {user.sessions.length ? (
            <ul className="space-y-2">
              {user.sessions.map((session) => (
                <li
                  key={session.id}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="truncate">{session.name}</span>
                  <time className="text-muted-foreground shrink-0 text-xs">
                    {session.last_used_at
                      ? formatDateTime(session.last_used_at)
                      : "never used"}
                  </time>
                </li>
              ))}
            </ul>
          ) : (
            <Empty>No active sessions.</Empty>
          )}
        </Section>
      </div>

      <Section title="Admin activity">
        <AuditTrail entries={user.audit_trail} />
      </Section>
    </div>
  );
}
