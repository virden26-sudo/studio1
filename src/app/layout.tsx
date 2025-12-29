

"use client";

import "./globals.css";
import * as React from "react";
import {
  Book,
  Calendar,
  Star,
  Bot,
  Plus,
  Settings,
  User as UserIcon,
  FileUp,
  BrainCircuit,
  Video,
  Trash2,
  Share2,
  LogOut,
  ExternalLink,
  BookCopy,
  CheckSquare,
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
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle as UIDialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { User } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { AppLogo } from "@/components/app-logo";
import { AddAssignmentDialog } from "@/components/dashboard/add-assignment-dialog";
import { IntelligentSchedulerDialog } from "@/components/dashboard/intelligent-scheduler-dialog";
import { ImportSyllabusDialog } from "@/components/dashboard/import-syllabus-dialog";
import { AssignmentsProvider } from "@/context/assignments-context";
import { GradesProvider } from "@/context/grades-context";
import { QuizzesProvider } from "@/context/quizzes-context";
import { TasksProvider } from "@/context/tasks-context";


function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
    const { isMobile, setOpenMobile } = useSidebar();
    const pathname = usePathname();
    const isActive = pathname === href;

    const handleClick = () => {
        if (isMobile) {
            setOpenMobile(false);
        }
    };

    return (
        <Link href={href} onClick={handleClick} data-active={isActive}>
            {children}
        </Link>
    );
}

function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { toast } = useToast();
  const { isMobile, setOpenMobile } = useSidebar();
  const [addAssignmentOpen, setAddAssignmentOpen] = React.useState(false);
  const [schedulerOpen, setSchedulerOpen] = React.useState(false);
  const [importSyllabusOpen, setImportSyllabusOpen] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const [namePromptOpen, setNamePromptOpen] = React.useState(false);
  const [resetDialogOpen, setResetDialogOpen] = React.useState(false);
  const [nameInput, setNameInput] = React.useState('');
  const [portalUrlInput, setPortalUrlInput] = React.useState("https://navigate.nu.edu/d2l/home");
  const [isUserLoaded, setIsUserLoaded] = React.useState(false);

  React.useEffect(() => {
    try {
      const storedUser = localStorage.getItem("agendaUser");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setNamePromptOpen(true);
      }
      const storedPortalUrl = localStorage.getItem("studentPortalUrl");
      if (storedPortalUrl) {
        setPortalUrlInput(storedPortalUrl);
      }

    } catch (e) {
      console.error("Failed to parse user from local storage", e);
      setNamePromptOpen(true);
    } finally {
      setIsUserLoaded(true);
    }
  }, []);

  const handleProfileSave = () => {
    if (nameInput.trim()) {
      const newUser: User = {
        name: nameInput.trim(),
        avatarUrl: `https://picsum.photos/seed/${nameInput.trim()}/100/100`,
      };
      localStorage.setItem("agendaUser", JSON.stringify(newUser));
      setUser(newUser);
      setNameInput('');
    }
    if(portalUrlInput.trim()){
      localStorage.setItem("studentPortalUrl", portalUrlInput);
    }
    setNamePromptOpen(false);
  };

  const getInitials = (name: string) => {
    if (!name) return "";
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`;
    }
    return names[0].charAt(0);
  }
  
  const handlePortalClick = () => {
    const portalUrl = localStorage.getItem("studentPortalUrl") || "https://navigate.nu.edu/d2l/home";
    window.open(portalUrl, "_blank");
  };

  const handleLogout = () => {
    localStorage.removeItem("agendaUser");
    setUser(null);
    setNamePromptOpen(true);
  };

  const handleResetApp = () => {
    localStorage.clear();
    window.location.reload();
  };
  
  const handleShare = async () => {
    try {
        await navigator.clipboard.writeText("My Agenda+ Summary!");
        toast({ title: 'Copied to Clipboard!', description: 'Your agenda summary has been copied.' });
    } catch (error) {
        console.error('Error copying:', error);
        toast({ variant: 'destructive', title: 'Could not copy summary.' });
    }
  }

  const navItems = [
    { href: "/", icon: Book, label: "Dashboard" },
    { href: "/assignments", icon: BookCopy, label: "Assignments" },
    { href: "/tasks", icon: CheckSquare, label: "Tasks" },
    { href: "/grades", icon: Star, label: "Grades" },
    { href: "/calendar", icon: Calendar, label: "Calendar" },
    { href: "/study", icon: BrainCircuit, label: "Study" },
    { href: "/live", icon: Video, label: "Live Session" },
  ];

  const pageTitles: { [key: string]: string } = {
    '/': 'Dashboard',
    '/assignments': 'Assignments',
    '/tasks': 'Tasks',
    '/grades': 'Grades',
    '/calendar': 'Calendar',
    '/study': 'Study Hub',
    '/live': 'Live Session'
  };
  
  const pageTitle = pageTitles[pathname] || "Dashboard";
  
  if (!isUserLoaded) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <div className="flex flex-col items-center justify-center gap-4">
                <AppLogo />
                <span className="text-5xl font-extrabold font-headline text-gradient" style={{ textShadow: '2px 4px 6px hsla(var(--foreground), 0.3), 0px 5px 15px hsla(var(--foreground), 0.2)'}}>Agenda Plus</span>
            </div>
      </div>
    );
  }

  return (
    <AssignmentsProvider>
      <GradesProvider>
        <QuizzesProvider>
            <TasksProvider>
                <Sidebar
                collapsible="icon"
                className="group-data-[variant=sidebar]:border-r-0"
                >
                <SidebarHeader className="items-center justify-center p-4">
                    <div className="flex items-center gap-2 group-data-[collapsible=icon]:gap-0">
                        <AppLogo />
                    </div>
                </SidebarHeader>
                <SidebarContent className="p-2">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <Button variant="default" className="w-full justify-start h-10" onClick={() => setAddAssignmentOpen(true)}>
                                <Plus className="mr-2 size-4" />
                                <span className="group-data-[collapsible=icon]:hidden">Add Assignment</span>
                            </Button>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <Button variant="secondary" className="w-full justify-start h-10" onClick={() => setImportSyllabusOpen(true)}>
                                <FileUp className="mr-2 size-4" />
                                <span className="group-data-[collapsible=icon]:hidden">Import Syllabus</span>
                            </Button>
                        </SidebarMenuItem>
                    </SidebarMenu>
                    <SidebarMenu className="mt-4">
                    {navItems.map((item) => (
                        <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton
                            asChild
                            isActive={pathname === item.href}
                            tooltip={item.label}
                        >
                            <NavLink href={item.href}>
                            <item.icon />
                            <span>{item.label}</span>
                            </NavLink>
                        </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={() => {
                                setSchedulerOpen(true);
                                if (isMobile) setOpenMobile(false);
                            }}
                            tooltip="AI Scheduler"
                            >
                            <Bot/>
                            <span>AI Scheduler</span>
                            </SidebarMenuButton>
                    </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarContent>
                <SidebarFooter className="p-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <button className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:!p-2">
                            <Avatar className="h-8 w-8">
                            <AvatarImage src={user?.avatarUrl} alt="User Avatar" data-ai-hint="person face" />
                            <AvatarFallback>{user ? getInitials(user.name) : 'A+'}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                            <span className="font-semibold text-sidebar-foreground">{user?.name ?? 'Welcome'}</span>
                            <span className="text-xs text-muted-foreground">{user ? 'Student' : 'Please set up your profile'}</span>
                            </div>
                        </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="right" align="start" className="w-56">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => { setNameInput(user?.name || ''); setNamePromptOpen(true);}}>
                                <UserIcon className="mr-2 h-4 w-4" />
                                Edit Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handlePortalClick}>
                                <ExternalLink className="mr-2 h-4 w-4" />
                                University Portal
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                Log out
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive" onClick={() => setResetDialogOpen(true)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Reset App
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarFooter>
                </Sidebar>
                <SidebarInset>
                <header className="flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 md:px-6 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                    <SidebarTrigger className="md:hidden" />
                    <h2 className="text-2xl font-headline text-gradient">{pageTitle}</h2>
                    </div>
                    <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={handleShare}>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                    </Button>
                    <Button onClick={() => setImportSyllabusOpen(true)}>Sync Data</Button>
                    </div>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {React.isValidElement(children) ? React.cloneElement(children, { user, setImportSyllabusOpen, isUserLoaded } as any) : children}
                </main>
                </SidebarInset>
                
                <AddAssignmentDialog open={addAssignmentOpen} onOpenChange={setAddAssignmentOpen} />
                <IntelligentSchedulerDialog open={schedulerOpen} onOpenChange={setSchedulerOpen} />
                <ImportSyllabusDialog open={importSyllabusOpen} onOpenChange={setImportSyllabusOpen} />
        
                <Dialog open={namePromptOpen} onOpenChange={(isOpen) => { if (user) { setNamePromptOpen(isOpen); } }}>
                <DialogContent onInteractOutside={(e) => {if (!user) e.preventDefault()}}>
                    <DialogHeader>
                        <UIDialogTitle className="font-headline text-gradient">Welcome to Agenda+</UIDialogTitle>
                        <DialogDescription>Please enter your name and student portal URL to personalize your experience.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input 
                                id="name" 
                                placeholder="e.g. Alex Doe"
                                value={nameInput}
                                onChange={(e) => setNameInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleProfileSave()}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="portal-url">Student Portal URL</Label>
                            <Input 
                                id="portal-url" 
                                placeholder="e.g. https://my.school.edu"
                                value={portalUrlInput}
                                onChange={(e) => setPortalUrlInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleProfileSave()}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleProfileSave} disabled={!nameInput.trim()}>Save</Button>
                    </DialogFooter>
                </DialogContent>
                </Dialog>
                <AlertDialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete all your
                        assignments, grades, and other saved data from your browser.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleResetApp} className="bg-destructive hover:bg-destructive/90">Reset App</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>
            </TasksProvider>
        </QuizzesProvider>
      </GradesProvider>
    </AssignmentsProvider>
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
        <meta name="application-name" content="Agenda+" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Agenda+" />
        <meta name="description" content="A smart agenda for students." />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#FFFFFF" />

        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon-192x192.png" />

        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full">
        <SidebarProvider>
            <AppShell>
            {children}
            </AppShell>
            <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}
