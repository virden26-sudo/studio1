import { Target, MoreVertical } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export function OverallProgressCard() {
  const overallGrade = 88; // Mock data
  const courseName = "CS 101: Intro to Programming"

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="flex items-center gap-2 text-gradient">
                    <Target className="h-6 w-6" />
                    Overall Progress
                </CardTitle>
                <CardDescription>{courseName}</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
            </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col items-center justify-center gap-4">
        <div className="relative h-40 w-40">
            <svg className="h-full w-full" width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-muted" strokeWidth="2"></circle>
                <g className="origin-center -rotate-90 transform">
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-primary" strokeWidth="2" strokeDasharray={`${overallGrade}, 100`}></circle>
                </g>
            </svg>
            <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <span className="text-center text-4xl font-bold text-gradient">{overallGrade}%</span>
            </div>
        </div>
        <p className="text-center text-muted-foreground">
            You're doing great! Keep up the good work.
        </p>
      </CardContent>
    </Card>
  );
}
