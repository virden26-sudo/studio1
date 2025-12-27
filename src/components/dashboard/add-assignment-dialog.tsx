
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bot, CalendarIcon, Loader2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useAssignments } from "@/context/assignments-context";
import { useToast } from "@/hooks/use-toast";
import { extractAssignmentData } from "@/ai/flows/extract-assignment-flow";

type AddAssignmentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AddAssignmentDialog({ open, onOpenChange }: AddAssignmentDialogProps) {
  const [aiInput, setAiInput] = useState("");
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [loading, setLoading] = useState(false);
  
  const { addAssignment } = useAssignments();
  const { toast } = useToast();

  const handleAiParse = async () => {
    if (!aiInput.trim()) return;
    setLoading(true);
    try {
      const result = await extractAssignmentData(aiInput);
      setTitle(result.title);
      setCourse(result.course);
      // Handle potential invalid date from AI
      const parsedDate = new Date(result.dueDate);
      if (!isNaN(parsedDate.getTime())) {
          // The AI returns a date at UTC midnight. Adjust to local timezone.
          const timezoneOffset = parsedDate.getTimezoneOffset() * 60000;
          setDueDate(new Date(parsedDate.getTime() + timezoneOffset));
      } else {
          toast({ variant: "destructive", title: "AI couldn't determine a valid date." });
          setDueDate(undefined);
      }
    } catch (error) {
      console.error("AI parsing failed", error);
      toast({ variant: "destructive", title: "AI parsing failed", description: "Please try rephrasing your request." });
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddAssignment = () => {
    if (!title || !course || !dueDate) {
        toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please fill out all fields to add an assignment."
        });
        return;
    }
    
    addAssignment({ title, course, dueDate });
    toast({ title: "Assignment Added", description: `${title} has been added to your agenda.`});
    
    // Reset state and close
    setAiInput("");
    setTitle("");
    setCourse("");
    setDueDate(undefined);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-gradient">Add New Assignment</DialogTitle>
          <DialogDescription>
            Use AI to parse assignment details or fill them in manually.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6">
            <div className="space-y-2">
                <Label htmlFor="ai-input">Describe your assignment</Label>
                <div className="flex gap-2">
                    <Input 
                        id="ai-input" 
                        placeholder="e.g. 'Calculus homework due next Friday'" 
                        value={aiInput}
                        onChange={(e) => setAiInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAiParse()}
                    />
                    <Button onClick={handleAiParse} disabled={loading} variant="outline" size="icon">
                        {loading ? <Loader2 className="animate-spin" /> : <Bot />}
                        <span className="sr-only">Parse with AI</span>
                    </Button>
                </div>
            </div>
            
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="e.g. Calculus Homework 3" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="course">Course</Label>
                    <Input id="course" placeholder="e.g. MATH 201" value={course} onChange={(e) => setCourse(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                            "w-full justify-start text-left font-normal",
                            !dueDate && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={dueDate}
                                onSelect={setDueDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleAddAssignment}>Add Assignment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
