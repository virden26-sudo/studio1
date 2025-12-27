
"use client";

import "./globals.css";
import * as React from "react";
import {
  Book,
  FileQuestion,
  MessageSquare,
  BarChart3,
  Megaphone,
  Download,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import type { User } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { AppLogo } from "@/components/app-logo";

function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { toast } = useToast();
  const [user, setUser] = React.useState<User | null>({
    name: "Jane Doe",
    email: "jane.doe@university.edu",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBmYWNlfGVufDB8fHx8MTc2NDUxOTc4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
  });
  const [setImportSyllabusOpen] = React.useState(false);

  const getInitials = (name: string) => {
    if (!name) return "";
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`;
    }
    return names[0].charAt(0);
  }

  const navItems = [
    { href: "/", icon: LayoutDashboard, label: "Dashboard" },
    { href: "#", icon: Book, label: "Assignments" },
    { href: "#", icon: FileQuestion, label: "Quizzes" },
    { href: "#", icon: MessageSquare, label: "Discussions" },
    { href: "#", icon: BarChart3, label: "Grades" },
    { href: "#", icon: Megaphone, label: "Announcements" },
    { href: "#", icon: Download, label: "APK Retrieval" },
  ];

  const pageTitle = "Dashboard";

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
            Agenda+
          </h1>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2">
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:!p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatarUrl} alt="User Avatar" data-ai-hint="person face" />
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
          <div className="flex items-center gap-4">
            <Button variant="outline">Share</Button>
            <Button onClick={() => setImportSyllabusOpen(true)}>Sync Data</Button>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
           {React.isValidElement(children) ? React.cloneElement(children, { user, setImportSyllabusOpen } as React.Attributes & { user: User | null, setImportSyllabusOpen: (open: boolean) => void }) : children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#fff" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`
          .text-gradient {
            background: linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `}</style>
      </head>
      <body className="font-body antialiased h-full">
        <AppShell>
          {children}
        </AppShell>
        <Toaster />
      </body>
    </html>
  );
}
