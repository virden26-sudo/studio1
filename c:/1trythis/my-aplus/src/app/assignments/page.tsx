
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useAssignments } from "@/context/assignments-context";
import { format } from 'date-fns';
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookCopy } from "lucide-react";

export default function AssignmentsPage() {
    const { assignments, loading, toggleAssignment } = useAssignments();

    const upcomingAssignments = assignments.filter(a => !a.completed).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    const completedAssignments = assignments.filter(a => a.completed).sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());

    const isOverdue = (date: Date) => new Date(date) < new Date();

    const AssignmentTable = ({ assignments, showCompleted = false }: { assignments: typeof upcomingAssignments, showCompleted?: boolean }) => (
         <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <TableRow key={i}>
                            <TableCell colSpan={5}>
                                <Skeleton className="h-8 w-full" />
                            </TableCell>
                        </TableRow>
                    ))
                ) : assignments.length > 0 ? (
                    assignments.map(assignment => (
                        <TableRow key={assignment.id}>
                            <TableCell>
                                <Checkbox 
                                    checked={assignment.completed} 
                                    onCheckedChange={() => toggleAssignment(assignment.id)} 
                                />
                            </TableCell>
                            <TableCell className="font-medium">{assignment.title}</TableCell>
                            <TableCell>{assignment.course}</TableCell>
                            <TableCell>{format(new Date(assignment.dueDate), 'PPP')}</TableCell>
                            <TableCell className="text-right">
                                {showCompleted ? (
                                    <Badge variant="secondary">Completed</Badge>
                                ) : isOverdue(assignment.dueDate) ? (
                                    <Badge variant="destructive">Overdue</Badge>
                                ) : (
                                    <Badge variant="outline">Pending</Badge>
                                )}
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                            No assignments here.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-gradient flex items-center gap-2">
                        <BookCopy />
                        Manage Assignments
                    </CardTitle>
                    <CardDescription>
                        Here's a list of all your assignments. Check them off as you go!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="upcoming">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                            <TabsTrigger value="completed">Completed</TabsTrigger>
                        </TabsList>
                        <TabsContent value="upcoming">
                           <AssignmentTable assignments={upcomingAssignments} />
                        </TabsContent>
                        <TabsContent value="completed">
                           <AssignmentTable assignments={completedAssignments} showCompleted />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
