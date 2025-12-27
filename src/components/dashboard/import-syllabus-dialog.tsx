
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
import { useToast } from "@/hooks/use-toast";
import { UploadCloud, File as FileIcon, Loader2 } from "lucide-react";
import { extractSyllabusData } from "@/ai/flows/extract-syllabus-flow";
import { useAssignments } from "@/context/assignments-context";
import { useGrades } from "@/context/grades-context";

type ImportSyllabusDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ImportSyllabusDialog({ open, onOpenChange }: ImportSyllabusDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { addAssignment: addAssignmentToContext } = useAssignments();
  const { addCourse } = useGrades();


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please choose a syllabus file to import.",
      });
      return;
    }

    setLoading(true);
    try {
      const fileContent = await file.text();
      const extractedData = await extractSyllabusData(fileContent);
      
      addCourse(extractedData.courseName);
      
      extractedData.assignments.forEach(assignment => {
        addAssignmentToContext({
            title: assignment.title,
            course: extractedData.courseName,
            dueDate: new Date(assignment.dueDate),
        })
      });
      
      // We don't have a quiz context yet, but we can log it
      console.log("Extracted Quizzes:", extractedData.quizzes);

      toast({
        title: "Import Successful!",
        description: `${extractedData.assignments.length} assignments for ${extractedData.courseName} have been added.`,
      });
      
      // Reset and close
      setFile(null);
      onOpenChange(false);
    } catch (error) {
      console.error("Syllabus import failed:", error);
      toast({
        variant: "destructive",
        title: "Import Failed",
        description: "Could not extract data from the syllabus. Please try a different file.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-gradient flex items-center gap-2">
            <UploadCloud /> Import Syllabus
          </DialogTitle>
          <DialogDescription>
            Upload a syllabus file (.txt, .md) to automatically add assignments and quizzes.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="syllabus-file">Syllabus File</Label>
            <div className="relative">
              <Input 
                id="syllabus-file" 
                type="file" 
                onChange={handleFileChange} 
                className="w-full h-10 pl-10"
                accept=".txt,.md,text/plain,text/markdown"
              />
              <FileIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            {file && <p className="text-sm text-muted-foreground">Selected: {file.name}</p>}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleImport} disabled={!file || loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Importing...
              </>
            ) : (
              "Import"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
