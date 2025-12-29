
"use client";

import { FileQuestion, MoreVertical, UploadCloud } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuizzes } from "@/context/quizzes-context";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { format } from "date-fns";

type QuizzesCardProps = {
  setImportSyllabusOpen: (open: boolean) => void;
};


export function QuizzesCard({ setImportSyllabusOpen }: QuizzesCardProps) {
  const { quizzes, loading } = useQuizzes();
  
  const upcomingQuizzes = [...quizzes]
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const isOverdue = (date: Date) => new Date(date) < new Date();

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="flex items-center gap-2 text-gradient">
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
         <ScrollArea className="h-72">
            <div className="space-y-4 pr-4">
            {loading ? (
              <>
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </>
            ) : upcomingQuizzes.length > 0 ? (
              upcomingQuizzes.map((quiz) => (
                  <div key={quiz.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50">
                      <div className="flex-1 space-y-1">
                          <p className="font-medium">{quiz.title}</p>
                          <p className="text-sm text-muted-foreground">{quiz.course} {quiz.questionCount ? ` • ${quiz.questionCount} questions` : ''}</p>
                      </div>
                      <Badge variant={isOverdue(quiz.dueDate) ? 'destructive' : 'outline'} className="text-sm">
                          {format(new Date(quiz.dueDate), 'MMM d')}
                      </Badge>
                  </div>
              ))
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                        <FileQuestion className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">No Quizzes Yet</h3>
                    <p className="text-muted-foreground text-sm mb-4">Sync with your syllabus to see your quizzes.</p>
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
