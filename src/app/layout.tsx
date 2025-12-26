
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
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
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
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { AppLogo } from "@/components/app-logo";

// Mock Data
export type Assignment = {
  id: string;
  title: string;
  course: string;
  dueDate: Date;
  completed: boolean;
};

// Mock Contexts
const AssignmentsContext = React.createContext<{ assignments: Assignment[] }>({ assignments: [] });
const GradesContext = React.createContext<{ courses: { name: string; grade: number }[] }>({ courses: [] });
const useAssignments = () => React.useContext(AssignmentsContext);
const useGrades = () => React.useContext(GradesContext);

// Mock Dialog Components
const AddAssignmentDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
                <UIDialogTitle>Add Assignment</UIDialogTitle>
            </DialogHeader>
        </DialogContent>
    </Dialog>
);
const IntelligentSchedulerDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
                <UIDialogTitle>Intelligent Scheduler</UIDialogTitle>
            </DialogHeader>
        </DialogContent>
    </Dialog>
);

const ImportSyllabusDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
            <DialogHeader>
                <UIDialogTitle>Import Syllabus</UIDialogTitle>
            </DialogHeader>
        </DialogContent>
    </Dialog>
);

const Logo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
        <path d="M2 17l10 5 10-5"></path>
        <path d="M2 12l10 5 10-5"></path>
    </svg>
);


function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { toast } = useToast();
  const { assignments } = useAssignments();
  const { courses } = useGrades();
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
    return name.split(" ").map(n => n[0]).join("");
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
    localStorage.removeItem("agendaUser");
    localStorage.removeItem("agendaAssignments");
    localStorage.removeItem("agendaGrades");
    localStorage.removeItem("studyPlan");
    localStorage.removeItem("studentPortalUrl");
    localStorage.removeItem("zoomLink");
    window.location.reload();
  };

  const formatShareText = (): string => {
    let text = `Hey! Here's a snapshot of my current agenda:\n\n`;
    
    text += "--- Upcoming Assignments ---\n";
    const upcoming = assignments.filter(a => !a.completed).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    if (upcoming.length > 0) {
      upcoming.forEach(a => {
        text += `- ${a.title} (${a.course}) - Due: ${new Date(a.dueDate).toLocaleDateString()}\n`;
      });
    } else {
      text += "No upcoming assignments. All caught up!\n";
    }

    text += "\n--- Current Grades ---\n";
    if (courses.length > 0) {
        courses.forEach(c => {
            text += `- ${c.name}: ${c.grade}%\n`;
        });
    } else {
        text += "No grades synced yet.\n";
    }

    return text;
  }

  const handleShare = async () => {
    const shareText = formatShareText();
    try {
        await navigator.clipboard.writeText(shareText);
        toast({ title: 'Copied to Clipboard!', description: 'Your agenda summary has been copied.' });
    } catch (error) {
        console.error('Error copying:', error);
        toast({ variant: 'destructive', title: 'Could not copy summary.' });
    }
  }

  const MobileSidebarHeader = (
    <SheetHeader className="border-b p-4">
       <SheetTitle className="sr-only">Main Menu</SheetTitle>
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <Logo className="h-6 w-6" />
        <span className="font-headline text-gradient">Agenda+</span>
      </Link>
    </SheetHeader>
  );

  const navItems = [
    { href: "/assignments", icon: Book, label: "Assignments" },
    { href: "/grades", icon: Star, label: "Grades" },
    { href: "/calendar", icon: Calendar, label: "Calendar" },
    { href: "/study", icon: BrainCircuit, label: "Study" },
  ];

  const pageTitles: { [key: string]: string } = {
    '/': 'Dashboard',
    '/assignments': 'Assignments',
    '/grades': 'Grades',
    '/calendar': 'Calendar',
    '/study': 'Study Hub'
  };
  
  const pageTitle = pageTitles[pathname] || "Dashboard";

  if (!isUserLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href="/" className="flex items-center gap-2 font-semibold p-2">
              <Logo className="h-6 w-6" />
              <span className="font-headline group-data-[collapsible=icon]:hidden text-gradient">Agenda+</span>
          </Link>
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
                  className="justify-start"
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon className="size-4 mr-2" />
                    <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
             <SidebarMenuItem>
                <SidebarMenuButton
                    onClick={() => setSchedulerOpen(true)}
                    className="justify-start"
                    tooltip="AI Scheduler"
                  >
                    <Bot className="size-4 mr-2" />
                    <span className="group-data-[collapsible=icon]:hidden">AI Scheduler</span>
                  </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton
                    asChild
                    isActive={pathname==='/study' && !pathname.startsWith('/study/')}
                    className="justify-start"
                    tooltip="Live Session"
                  >
                    <Link href="/study">
                        <Video className="size-4 mr-2" />
                        <span className="group-data-[collapsible=icon]:hidden">Live Session</span>
                    </Link>
                  </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t p-2">
          <SidebarMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuItem>
                    <SidebarMenuButton className="justify-start" tooltip="Settings">
                        <Settings className="size-4 mr-2" />
                        <span className="group-data-[collapsible=icon]:hidden">Settings</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" side="top" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { setNameInput(user?.name || ''); setNamePromptOpen(true);}}>
                  Edit Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handlePortalClick}>
                  University Portal
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
                 <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive" onClick={() => setResetDialogOpen(true)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Reset App
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <SidebarMenuItem>
                <SidebarMenuButton className="h-auto justify-start" onClick={() => {setNameInput(user?.name || ''); setNamePromptOpen(true);}}>
                    <Avatar className="size-8 mr-2">
                      {user?.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.name || ''} data-ai-hint="person portrait" />}
                      <AvatarFallback>{user ? getInitials(user.name) : <UserIcon/>}</AvatarFallback>
                    </Avatar>
                     <div className="flex flex-col items-start group-data-[collapsible=icon]:hidden">
                        {user ? (
                            <>
                                <span className="text-gradient font-semibold">{user.name}</span>
                                <span className="text-xs text-muted-foreground">Edit Profile</span>
                            </>
                        ) : (
                            <span className="text-gradient">Set User</span>
                        )}
                    </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sticky top-0 z-30 lg:h-[60px] lg:px-6">
          <SidebarTrigger />
          <h1 className="flex-1 text-lg font-semibold md:text-xl font-headline text-gradient">{pageTitle}</h1>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden md:flex" onClick={handleShare}>
              <Share2 className="mr-2 size-4" />
              Share
            </Button>
            <Button variant="outline" size="icon" className="md:hidden" onClick={() => setAddAssignmentOpen(true)}>
              <Plus className="size-4" />
              <span className="sr-only">Add Assignment</span>
            </Button>
            <Button variant="outline" size="icon" className="md:hidden" onClick={handleShare}>
              <Share2 className="size-4" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
           {React.isValidElement(children) ? React.cloneElement(children, { user, setImportSyllabusOpen, isUserLoaded } as React.Attributes & { user: User | null, setImportSyllabusOpen: (open: boolean) => void, isUserLoaded: boolean }) : children}
        </main>
      </SidebarInset>
      <AddAssignmentDialog open={addAssignmentOpen} onOpenChange={setAddAssignmentOpen} />
      <IntelligentSchedulerDialog open={schedulerOpen} onOpenChange={setSchedulerOpen} />
      <ImportSyllabusDialog open={importSyllabusOpen} onOpenChange={setImportSyllabusOpen} />
      <Dialog open={namePromptOpen} onOpenChange={(isOpen) => {
        if (user) {
          setNamePromptOpen(isOpen);
        }
      }}>
        <DialogContent onInteractOutside={(e) => {if (!user) e.preventDefault()}}>
            <DialogHeader>
                <UIDialogTitle>Welcome to Agenda+</UIDialogTitle>
                <DialogDescription>Please enter your name to personalize your experience.</DialogDescription>
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

    