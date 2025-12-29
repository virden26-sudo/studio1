
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useAssignments } from "@/context/assignments-context";
import { useQuizzes } from "@/context/quizzes-context";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { format, isSameDay } from 'date-fns';

export default function CalendarPage() {
    const { assignments } = useAssignments();
    const { quizzes } = useQuizzes();
    const [date, setDate] = useState<Date | undefined>(new Date());

    const events = [...assignments, ...quizzes].map(item => ({
        date: new Date(item.dueDate),
        title: item.title,
        type: 'assignment' in item ? 'Assignment' : 'Quiz'
    }));

    const renderDay = (day: Date) => {
        const dayEvents = events.filter(event => isSameDay(day, event.date));
        return (
            <div className="relative flex flex-col items-center justify-center h-full">
                {format(day, 'd')}
                {dayEvents.length > 0 && (
                    <div className="absolute bottom-1 flex space-x-1">
                        {dayEvents.map((event, index) => (
                           <div key={index} className={`h-1.5 w-1.5 rounded-full ${event.type === 'Assignment' ? 'bg-primary' : 'bg-accent'}`}></div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const selectedDayEvents = date ? events.filter(event => isSameDay(date, event.date)) : [];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
                <CardContent className="p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="w-full"
                        components={{
                            DayContent: ({ date }) => renderDay(date)
                        }}
                    />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-gradient">
                        Events for {date ? format(date, 'PPP') : 'selected date'}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {selectedDayEvents.length > 0 ? (
                        <div className="space-y-4">
                            {selectedDayEvents.map((event, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className={`w-2 h-10 rounded-full ${event.type === 'Assignment' ? 'bg-primary' : 'bg-accent'}`}/>
                                    <div>
                                        <p className="font-semibold">{event.title}</p>
                                        <Badge variant={event.type === 'Assignment' ? 'default' : 'secondary'}>{event.type}</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground">No events for this day.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
