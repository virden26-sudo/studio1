import { BookOpenCheck, MoreVertical } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { assignments } from "@/lib/mock-data";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { ScrollArea } from "../ui/scroll-area";

export function AssignmentsCard() {
  const sortedAssignments = [...assignments].sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  
  const isOverdue = (date: Date) => date < new Date();

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="flex items-center gap-2">
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
            {sortedAssignments.map((assignment) => (
                <div key={assignment.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50">
                    <Checkbox id={`assignment-${assignment.id}`} checked={assignment.submitted} />
                    <div className="flex-1 space-y-1">
                        <label htmlFor={`assignment-${assignment.id}`} className="font-medium cursor-pointer">{assignment.title}</label>
                        <p className="text-sm text-muted-foreground">{assignment.course}</p>
                    </div>
                    <Badge variant={isOverdue(assignment.dueDate) && !assignment.submitted ? 'destructive' : 'outline'} className="text-sm" style={{backgroundColor: isOverdue(assignment.dueDate) && !assignment.submitted ? '' : 'hsl(var(--accent) / 0.2)', color: isOverdue(assignment.dueDate) && !assignment.submitted ? '' : 'hsl(var(--accent-foreground))'}}>
                        {assignment.dueDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </Badge>
                </div>
            ))}
            </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
