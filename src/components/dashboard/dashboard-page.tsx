'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  BookOpenCheck,
  FileQuestion,
  LayoutDashboard,
  LogOut,
  Megaphone,
  MessageSquare,
  BarChart3,
  Settings,
  MoreHorizontal,
  Download,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import { AppLogo } from '@/components/app-logo'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { AnnouncementsCard } from '@/components/dashboard/announcements-card'
import { AssignmentsCard } from '@/components/dashboard/assignments-card'
import { QuizzesCard } from '@/components/dashboard/quizzes-card'
import { DiscussionsCard } from '@/components/dashboard/discussions-card'
import { GradesCard } from '@/components/dashboard/grades-card'
import { OverallProgressCard } from '@/components/dashboard/overall-progress-card'
import type { User } from '@/lib/types'

type DashboardPageProps = {
  user?: User | null;
  setImportSyllabusOpen?: (open: boolean) => void;
};


export function DashboardPage({ user, setImportSyllabusOpen }: DashboardPageProps) {
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar')
  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`;
    }
    return names[0].charAt(0);
  }

  return (
    <SidebarProvider>
      <Sidebar
        variant="sidebar"
        collapsible="icon"
        className="group-data-[variant=sidebar]:border-r-0"
      >
        <SidebarHeader className="items-center justify-center p-4">
          <AppLogo />
          <h1 className="text-2xl font-bold text-primary group-data-[collapsible=icon]:hidden">
            CourseCompass
          </h1>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" isActive tooltip="Dashboard">
                <LayoutDashboard />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" tooltip="Assignments">
                <BookOpenCheck />
                <span>Assignments</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" tooltip="Quizzes">
                <FileQuestion />
                <span>Quizzes</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" tooltip="Discussions">
                <MessageSquare />
                <span>Discussions</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" tooltip="Grades">
                <BarChart3 />
                <span>Grades</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" tooltip="Announcements">
                <Megaphone />
                <span>Announcements</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton href="#" tooltip="APK Retrieval">
                <Download />
                <span>APK Retrieval</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2">
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:!p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatarUrl} alt="User Avatar" data-ai-hint={userAvatar?.imageHint} />
                    <AvatarFallback>{user ? getInitials(user.name) : 'JD'}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                    <span className="font-semibold text-sidebar-foreground">{user?.name ?? 'Jane Doe'}</span>
                    <span className="text-xs text-muted-foreground">{user?.email ?? 'jane.doe@university.edu'}</span>
                  </div>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 md:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
             <SidebarTrigger className="md:hidden" />
             <h2 className="text-2xl font-semibold">Dashboard</h2>
          </div>
          <Button onClick={() => setImportSyllabusOpen?.(true)}>Sync Data</Button>
        </header>

        <main className="flex-1 animate-in fade-in-50 duration-500 p-4 md:p-6">
          <div className="grid gap-6 auto-rows-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-6">
            <div className="lg:col-span-4">
                <AssignmentsCard />
            </div>
            <div className="lg:col-span-2">
                <OverallProgressCard />
            </div>
            <div className="lg:col-span-3">
                <AnnouncementsCard />
            </div>
            <div className="lg:col-span-3">
                <QuizzesCard />
            </div>
            <div className="lg:col-span-3">
                <DiscussionsCard />
            </div>
            <div className="lg:col-span-3">
                <GradesCard />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
