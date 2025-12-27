import { BarChart3, MoreVertical } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { grades } from "@/lib/mock-data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function getGradeColor(grade: number) {
    if (grade >= 90) return 'text-green-600'
    if (grade >= 80) return 'text-blue-600'
    if (grade >= 70) return 'text-yellow-600'
    return 'text-red-600'
}

export function GradesCard() {
  const recentGrades = grades.slice(0, 4);

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
                {recentGrades.map(grade => (
                    <TableRow key={grade.id}>
                        <TableCell className="font-medium">{grade.assignment}</TableCell>
                        <TableCell>{grade.course}</TableCell>
                        <TableCell className={`text-right font-bold ${getGradeColor(grade.grade)}`}>{grade.grade}%</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
