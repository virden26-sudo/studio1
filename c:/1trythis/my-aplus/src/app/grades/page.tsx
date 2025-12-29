
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGrades } from "@/context/grades-context";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Star } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


export default function GradesPage() {
    const { courses, loading } = useGrades();

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-gradient flex items-center gap-2">
                        <Star />
                        Course Grades
                    </CardTitle>
                    <CardDescription>
                        An overview of your grades for each course.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="space-y-4">
                            <Skeleton className="h-20 w-full" />
                            <Skeleton className="h-20 w-full" />
                        </div>
                    ) : courses.length === 0 ? (
                        <div className="text-center text-muted-foreground py-12">
                            <p>No courses found.</p>
                            <p className="text-sm">Sync a syllabus to get started.</p>
                        </div>
                    ) : (
                       <Accordion type="single" collapsible className="w-full">
                            {courses.map(course => (
                                <AccordionItem value={course.id} key={course.id}>
                                    <AccordionTrigger>
                                        <div className="flex items-center gap-4 w-full pr-4">
                                            <div className="w-20 h-20">
                                                <CircularProgress progress={course.grade} />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <h3 className="text-lg font-semibold">{course.name}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {course.grades.length} graded item(s)
                                                </p>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {course.grades.length > 0 ? (
                                           <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Assignment</TableHead>
                                                        <TableHead className="text-right">Score</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {course.grades.map(grade => (
                                                        <TableRow key={grade.id}>
                                                            <TableCell>{grade.assignmentTitle}</TableCell>
                                                            <TableCell className="text-right font-medium">{grade.score} / {grade.total}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                           </Table>
                                        ) : (
                                            <p className="text-muted-foreground text-center p-4">No grades have been recorded for this course yet.</p>
                                        )}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                       </Accordion>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
