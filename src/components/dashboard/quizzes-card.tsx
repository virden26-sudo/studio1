import { FileQuestion, MoreVertical } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { quizzes } from "@/lib/mock-data";
import { Badge } from "../ui/badge";

export function QuizzesCard() {
  const isOverdue = (date: Date) => date < new Date();

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="flex items-center gap-2">
                <FileQuestion className="h-6 w-6" />
                Upcoming Quizzes
                </CardTitle>
                <CardDescription>Get ready for your next test</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
            </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="flex items-center gap-4">
              <div className="flex-1 space-y-1">
                <p className="font-medium">{quiz.title}</p>
                <p className="text-sm text-muted-foreground">{quiz.course} &bull; {quiz.questionCount} questions</p>
              </div>
              <Badge variant={isOverdue(quiz.dueDate) ? 'destructive' : 'outline'} className="text-sm" style={{backgroundColor: isOverdue(quiz.dueDate) ? '' : 'hsl(var(--accent) / 0.2)', color: isOverdue(quiz.dueDate) ? '' : 'hsl(var(--accent-foreground))'}}>
                Due {quiz.dueDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
