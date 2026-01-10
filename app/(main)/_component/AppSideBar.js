'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Plus } from "lucide-react"
import { DashboardOptions } from '@/app/services/Constants'
import { usePathname } from 'next/navigation'


export function AppSidebar() {
    const pathname = usePathname()
  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader className="m-2 flex items-center justify-center flex-col">
        <h1 className="text-xl font-extrabold tracking-widest
                       bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900
                       bg-clip-text text-transparent">
          SCHEDULE<span className="text-gray-400">-</span>INTERVIEW
        </h1>

        <Button className="m-3 w-full">
          <Plus className="mr-2 h-4 w-4" />
          Create New Interview
        </Button>
      </SidebarHeader>

      {/* Sidebar Menu */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className='px-4'>
            {DashboardOptions.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.path
              return (
                <SidebarMenuItem className='p-2' key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.path}
                      className="flex items-center gap-3"
                    >
                      <Icon className="h-4 w-4" />
                      <span className='text-[16px]'>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  )
}
