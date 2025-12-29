
"use client";

import { BookOpenCheck, MoreVertical, UploadCloud } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { ScrollArea } from "../ui/scroll-area";
import { useAssignments } from "@/context/assignments-context";
import { Skeleton } from "../ui/skeleton";
import { format } from 'date-fns';

type AssignmentsCardProps = {
  setImportSyllabusOpen: (open: boolean) => void;
};

export function AssignmentsCard({ setImportSyllabusOpen }: AssignmentsCardProps) {
  const { assignments, toggleAssignment, loading } = useAssignments();

  const upcomingAssignments = [...assignments]
    .filter(a => !a.completed)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  
  const isOverdue = (date: Date) => new Date(date) < new Date();

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="flex items-center gap-2 text-gradient">
                <BookOpenCheck className="h-6 w-6" />
                Upcoming Assignments
                </CardTitle>
                <CardDescription>Stay on top of your deadlines</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
            </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <ScrollArea className="h-72">
            <div className="space-y-4 pr-4">
            {loading ? (
              <>
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </>
            ) : upcomingAssignments.length > 0 ? (
              upcomingAssignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50">
                      <Checkbox id={`assignment-${assignment.id}`} checked={assignment.completed} onCheckedChange={() => toggleAssignment(assignment.id)} />
                      <div className="flex-1 space-y-1">
                          <label htmlFor={`assignment-${assignment.id}`} className="font-medium cursor-pointer">{assignment.title}</label>
                          <p className="text-sm text-muted-foreground">{assignment.course}</p>
                      </div>
                      <Badge variant={isOverdue(assignment.dueDate) && !assignment.completed ? 'destructive' : 'outline'} className="text-sm">
                          {format(new Date(assignment.dueDate), 'MMM d')}
                      </Badge>
                  </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <BookOpenCheck className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-1">No Assignments Yet</h3>
                <p className="text-muted-foreground text-sm mb-4">Sync with your syllabus to get started.</p>
                <Button variant="secondary" onClick={() => setImportSyllabusOpen(true)}>
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Sync Data
                </Button>
              </div>
            )}
            </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
