'use client'

import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import Link from 'next/link';

// Menu items.
const items = [
    {
      title: "Home",
      url: "/home",
      icon: Home,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ]

export default function SideBarMenuItems() {
    const pathname = usePathname();

    return (
        <SidebarMenu>
            {items.map((item) => (
                <SidebarMenuItem className="text-zinc-700 font-medium" key={item.title}>
                <SidebarMenuButton asChild>
                    <Link href={item.url} className={ clsx("py-5 my-0 hover:bg-zinc-900 hover:text-white", { 'bg-zinc-900 text-white': pathname === item.url }) }>
                    <item.icon />
                    <span>{item.title}</span>
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )
}
