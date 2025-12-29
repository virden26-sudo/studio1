
"use client";

import { useState } from "react";
import { BrainCircuit, Calendar, Download, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAssignments } from "@/context/assignments-context";
import { generateStudyPlan } from "@/ai/flows/study-plan-flow";
import type { StudyPlan } from "@/ai/schemas";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import * as ics from 'ics';
import { Badge } from "@/components/ui/badge";

export default function StudyPage() {
  const { assignments } = useAssignments();
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGeneratePlan = async () => {
    setLoading(true);
    setStudyPlan(null);
    try {
      const upcomingAssignments = assignments.filter(a => !a.completed);
      if (upcomingAssignments.length === 0) {
        toast({
          variant: "destructive",
          title: "No assignments to plan for!",
          description: "Add some assignments or import a syllabus first.",
        });
        return;
      }
      const plan = await generateStudyPlan(upcomingAssignments);
      setStudyPlan(plan);
    } catch (error) {
      console.error("Failed to generate study plan:", error);
      toast({
        variant: "destructive",
        title: "Error Generating Plan",
        description: "The AI failed to create a study plan. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleDownloadCalendar = () => {
    if (!studyPlan) return;

    const events: ics.EventAttributes[] = studyPlan.sessions.map(session => {
        const startDate = new Date(session.startTime);
        const endDate = new Date(session.endTime);
        const duration = (endDate.getTime() - startDate.getTime()) / (1000 * 60);

        return {
            title: `Study: ${session.topic}`,
            start: [startDate.getUTCFullYear(), startDate.getUTCMonth() + 1, startDate.getUTCDate(), startDate.getUTCHours(), startDate.getUTCMinutes()],
            duration: { minutes: duration },
            description: `Focus on: ${session.goals.join(', ')}. Related to assignment: ${session.relatedAssignment}.`,
            alarms: [
                { action: 'display', description: 'Reminder', trigger: { hours: 1, before: true } },
            ],
        };
    });

    const { error, value } = ics.createEvents(events);

    if (error) {
        console.error("Failed to create ICS file:", error);
        toast({ variant: "destructive", title: "Could not create calendar file." });
        return;
    }

    if (!value) return;

    const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'study-plan.ics');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="max-w-4xl mx-auto w-full">
        <CardHeader>
          <CardTitle className="text-gradient flex items-center gap-2">
            <BrainCircuit className="h-6 w-6" />
            AI Study Plan Generator
          </CardTitle>
          <CardDescription>
            Let AI create a personalized study schedule based on your upcoming assignments and quizzes to help you stay on track.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <Button onClick={handleGeneratePlan} disabled={loading || assignments.filter(a => !a.completed).length === 0}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Plan...
                </>
              ) : (
                "Generate Study Plan"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {loading && (
         <div className="text-center text-muted-foreground">
            <p>Analyzing your schedule and creating a plan...</p>
        </div>
      )}

      {studyPlan && (
        <Card className="max-w-4xl mx-auto w-full animate-in fade-in-50 duration-500">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-gradient">Your Personalized Study Plan</CardTitle>
                        <CardDescription>{studyPlan.summary}</CardDescription>
                    </div>
                    <Button onClick={handleDownloadCalendar} variant="outline">
                        <Download className="mr-2 h-4 w-4"/>
                        Download Calendar
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {studyPlan.sessions.map((session, index) => (
                        <div key={index} className="p-4 rounded-lg border bg-card/50">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-semibold text-lg">{session.topic}</h3>
                                <Badge variant="secondary">{format(new Date(session.startTime), 'eee, MMM d')} &bull; {format(new Date(session.startTime), 'h:mm a')}</Badge>
                            </div>
                            <p className="text-muted-foreground mb-3">
                                <span className="font-medium text-foreground">Goal:</span> {session.goals.join('; ')}
                            </p>
                            <p className="text-sm text-muted-foreground">Related Assignment: <span className="font-medium">{session.relatedAssignment}</span></p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
