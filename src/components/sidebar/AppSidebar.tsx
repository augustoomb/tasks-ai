import SignOut from "@/components/shared/SignOut";
import LoggedUser from "./LoggedUser";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { ChevronUp, Bot } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarFooter,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SideBarMenuItems from "./SideBarMenuItems";
import Link from "next/link";

export function AppSidebar() {
  return (
    <SidebarProvider className="">
      <Sidebar className="p-4 border-r-2 border-white">
        <SidebarHeader className="border-solid border-x-2 border-t-2 border-zinc-100 rounded-t-xl">
          <div className="flex h-12 items-center justify-center">
            <Image src={"/blacklogo.png"} alt="Logo" width={100} height={100} />            
          </div>
        </SidebarHeader>
        <Separator className="self-center w-10/12 bg-zinc-200"/>
        <SidebarContent className="border-solid border-x-2 border-zinc-100">
          <SidebarGroup>
            {/* <SidebarGroupLabel>Grupo 1</SidebarGroupLabel> */}
            <SidebarGroupContent>              
              <SideBarMenuItems />  {/* custom  */}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-solid border-x-2 border-b-2 border-zinc-100 rounded-b-xl">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <LoggedUser />
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <SignOut />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}
