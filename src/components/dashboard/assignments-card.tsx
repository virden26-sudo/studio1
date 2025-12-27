
"use client";

import { BookOpenCheck, MoreVertical } from "lucide-react";
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

export function AssignmentsCard() {
  const { assignments, toggleAssignment, loading } = useAssignments();

  const sortedAssignments = [...assignments].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  
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
            ) : sortedAssignments.length > 0 ? (
              sortedAssignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50">
                      <Checkbox id={`assignment-${assignment.id}`} checked={assignment.completed} onCheckedChange={() => toggleAssignment(assignment.id)} />
                      <div className="flex-1 space-y-1">
                          <label htmlFor={`assignment-${assignment.id}`} className="font-medium cursor-pointer">{assignment.title}</label>
                          <p className="text-sm text-muted-foreground">{assignment.course}</p>
                      </div>
                      <Badge variant={isOverdue(assignment.dueDate) && !assignment.completed ? 'destructive' : 'outline'} className="text-sm" style={{backgroundColor: isOverdue(assignment.dueDate) && !assignment.completed ? '' : 'hsl(var(--accent) / 0.2)', color: isOverdue(assignment.dueDate) && !assignment.completed ? '' : 'hsl(var(--accent-foreground))'}}>
                          {new Date(assignment.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </Badge>
                  </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center">No assignments found. Try importing a syllabus!</p>
            )}
            </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
