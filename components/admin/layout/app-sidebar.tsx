"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Banknote,
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  CreditCard,
  FileText,
  Flag,
  LayoutDashboard,
  Megaphone,
  MessageSquare,
  ScrollText,
  Send,
  Settings,
  ShoppingCart,
  Tags,
  Ticket,
  Users,
  Wrench,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const NAV_GROUPS = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { title: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
      { title: "Alerts", href: "/dashboard/notifications", icon: Bell },
    ],
  },
  {
    label: "Moderation",
    items: [
      { title: "Users", href: "/dashboard/users", icon: Users },
      {
        title: "Organisations",
        href: "/dashboard/organisations",
        icon: Building2,
      },
      { title: "Events", href: "/dashboard/events", icon: CalendarDays },
      { title: "Comments", href: "/dashboard/comments", icon: MessageSquare },
      { title: "Reports", href: "/dashboard/reports", icon: Flag },
    ],
  },
  {
    label: "Commerce",
    items: [
      { title: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
      { title: "Payments", href: "/dashboard/payments", icon: CreditCard },
      { title: "Payouts", href: "/dashboard/payouts", icon: Banknote },
      { title: "Tickets", href: "/dashboard/issued-tickets", icon: Ticket },
    ],
  },
  {
    label: "Messaging",
    items: [
      {
        title: "Announcements",
        href: "/dashboard/announcements",
        icon: Megaphone,
      },
      { title: "Broadcasts", href: "/dashboard/broadcasts", icon: Send },
    ],
  },
  {
    label: "Platform",
    items: [
      { title: "Catalogs", href: "/dashboard/catalogs", icon: Tags },
      { title: "Content", href: "/dashboard/content", icon: FileText },
      { title: "Settings", href: "/dashboard/settings", icon: Settings },
      { title: "Ops", href: "/dashboard/ops", icon: Wrench },
      { title: "Audit log", href: "/dashboard/audit-log", icon: ScrollText },
    ],
  },
] as const

function isActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="px-3 py-2">
        <Link href="/dashboard" className="text-lg font-bold tracking-tight">
          Cheevo
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {NAV_GROUPS.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(pathname, item.href)}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
