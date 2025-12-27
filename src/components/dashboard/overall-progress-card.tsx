
"use client";

import { Target, MoreVertical } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@/components/ui/circular-progress";
import { useGrades } from "@/context/grades-context";
import { useMemo } from "react";
import { Skeleton } from "../ui/skeleton";


export function OverallProgressCard() {
  const { courses, loading } = useGrades();
  
  const overallAverage = useMemo(() => {
    if (courses.length === 0) return 0;
    const totalGrade = courses.reduce((acc, course) => acc + course.grade, 0);
    return Math.round(totalGrade / courses.length);
  }, [courses]);

  const courseName = "Overall Average"

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
        {loading ? (
            <Skeleton className="w-40 h-40 rounded-full" />
        ) : (
            <div className="w-40 h-40">
              <CircularProgress progress={overallAverage} />
            </div>
        )}
      </CardContent>
    </Card>
  );
}
