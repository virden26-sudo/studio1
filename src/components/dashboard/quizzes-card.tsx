
"use client";

import { FileQuestion, MoreVertical } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function QuizzesCard() {
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
        <div className="space-y-4">
            <p className="text-muted-foreground text-center">No upcoming quizzes.</p>
        </div>
      </CardContent>
    </Card>
  );
}
