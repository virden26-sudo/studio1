
"use client";

import { BarChart3, MoreVertical } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGrades } from "@/context/grades-context";
import { Skeleton } from "../ui/skeleton";

function getGradeColor(grade: number) {
    if (grade >= 90) return 'text-green-600'
    if (grade >= 80) return 'text-blue-600'
    if (grade >= 70) return 'text-yellow-600'
    return 'text-red-600'
}

export function GradesCard() {
  const { courses, loading } = useGrades();
  
  const recentGrades = courses
    .flatMap(course => course.grades.map(grade => ({ ...grade, courseName: course.name })))
    .slice(0, 4);


  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
         <div className="flex justify-between items-start">
            <div>
                <CardTitle className="flex items-center gap-2 text-gradient">
                <BarChart3 className="h-6 w-6" />
                Recent Grades
                </CardTitle>
                <CardDescription>Your latest graded assignments</CardDescription>
            </div>
            <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
            </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead className="text-right">Grade</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {loading ? (
                  <>
                    <TableRow>
                      <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-1/2" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-5 w-1/4 ml-auto" /></TableCell>
                    </TableRow>
                     <TableRow>
                      <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-1/2" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-5 w-1/4 ml-auto" /></TableCell>
                    </TableRow>
                  </>
                ) : recentGrades.length > 0 ? (
                  recentGrades.map(grade => (
                      <TableRow key={grade.id}>
                          <TableCell className="font-medium">{grade.assignmentTitle}</TableCell>
                          <TableCell>{grade.courseName}</TableCell>
                          <TableCell className={`text-right font-bold ${getGradeColor(grade.score / grade.total * 100)}`}>{Math.round(grade.score / grade.total * 100)}%</TableCell>
                      </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground">No grades have been recorded yet.</TableCell>
                  </TableRow>
                )}
            </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
