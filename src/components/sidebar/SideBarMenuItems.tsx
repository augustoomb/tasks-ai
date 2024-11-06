'use client'

import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';
import { Calendar, Home, Inbox, Search, Settings, Package } from "lucide-react";
import Link from 'next/link';


export default function SideBarMenuItems() {
    const pathname = usePathname();

    const items = [
      {
        title: "Home",
        url: `/panel/home`,
        icon: Home,
      },
      {
        title: "Módulos",
        url: `/panel/modules`,
        icon: Package,
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
