
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
import { UploadCloud, File as FileIcon, Loader2, ClipboardPaste, ExternalLink } from "lucide-react";
import { extractSyllabusData } from "@/ai/flows/extract-syllabus-flow";
import { useAssignments } from "@/context/assignments-context";
import { useGrades } from "@/context/grades-context";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useQuizzes } from "@/context/quizzes-context";

type ImportSyllabusDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ImportSyllabusDialog({ open, onOpenChange }: ImportSyllabusDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { addAssignment: addAssignmentToContext } = useAssignments();
  const { addQuiz: addQuizToContext } = useQuizzes();
  const { addCourse } = useGrades();
  const [activeTab, setActiveTab] = useState("paste");


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handlePortalClick = () => {
    const portalUrl = localStorage.getItem("studentPortalUrl") || "https://navigate.nu.edu/d2l/home";
    window.open(portalUrl, "_blank");
  };

  const handleImport = async () => {
    let fileContent: string | null = null;
    
    if (activeTab === 'paste') {
        if (!pastedText.trim()) {
            toast({
                variant: "destructive",
                title: "No text provided",
                description: "Please paste your syllabus content into the text area.",
            });
            return;
        }
        fileContent = pastedText;
    } else { // file upload
        if (!file) {
            toast({
                variant: "destructive",
                title: "No file selected",
                description: "Please choose a syllabus file to import.",
            });
            return;
        }
        
        try {
            fileContent = await file.text();
        } catch (readError) {
            console.error("File read error:", readError);
            toast({
                variant: "destructive",
                title: "Could not read file",
                description: "There was a problem reading the selected file. Please try again.",
            });
            setLoading(false);
            return;
        }
    }


    if (!fileContent) return;

    setLoading(true);
    try {
      const extractedData = await extractSyllabusData(fileContent);
      
      if (!extractedData.courseName && extractedData.assignments.length === 0 && extractedData.quizzes.length === 0) {
        toast({
            variant: "destructive",
            title: "Import Failed",
            description: "The AI could not extract any useful information. Please check the content and try again.",
        });
        return;
      }
      
      addCourse(extractedData.courseName);
      
      extractedData.assignments.forEach(assignment => {
        addAssignmentToContext({
            title: assignment.title,
            course: extractedData.courseName,
            // The AI returns a date at UTC midnight. Adjust to local timezone.
            dueDate: new Date(new Date(assignment.dueDate).getTime() + new Date().getTimezoneOffset() * 60000),
        })
      });
      
      extractedData.quizzes.forEach(quiz => {
        addQuizToContext({
            title: quiz.title,
            course: extractedData.courseName,
            dueDate: new Date(new Date(quiz.dueDate).getTime() + new Date().getTimezoneOffset() * 60000),
            questionCount: quiz.questionCount
        })
      });

      toast({
        title: "Import Successful!",
        description: `${extractedData.assignments.length} assignments and ${extractedData.quizzes.length} quizzes for ${extractedData.courseName || 'your course'} have been added.`,
      });
      
      // Reset and close
      setFile(null);
      setPastedText("");
      onOpenChange(false);
    } catch (error) {
      console.error("Syllabus import failed:", error);
      toast({
        variant: "destructive",
        title: "Import Failed",
        description: "Could not extract data from the syllabus. Please check the content or file format and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-gradient flex items-center gap-2">
            <UploadCloud /> Sync Data
          </DialogTitle>
          <DialogDescription>
            Choose a method to import your course data. You can paste content from your student portal or upload a syllabus file.
          </DialogDescription>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="pt-4">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="paste">
                    <ClipboardPaste className="mr-2 h-4 w-4" />
                    Paste from Portal
                </TabsTrigger>
                <TabsTrigger value="upload">
                    <FileIcon className="mr-2 h-4 w-4" />
                    Upload File
                </TabsTrigger>
            </TabsList>
            <TabsContent value="paste" className="py-4 space-y-4">
                 <Button variant="outline" className="w-full" onClick={handlePortalClick}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open Student Portal
                 </Button>
                 <div className="space-y-2">
                    <Label htmlFor="syllabus-text">Syllabus or Portal Content</Label>
                    <Textarea 
                        id="syllabus-text"
                        placeholder="Paste the content from your syllabus or student portal here..."
                        className="h-48 resize-none"
                        value={pastedText}
                        onChange={(e) => setPastedText(e.target.value)}
                    />
                 </div>
            </TabsContent>
            <TabsContent value="upload" className="py-4">
                <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="syllabus-file">Syllabus File</Label>
                    <div className="relative">
                    <Input 
                        id="syllabus-file" 
                        type="file" 
                        onChange={handleFileChange} 
                        className="w-full h-10"
                        accept=".txt,.pdf,.doc,.docx"
                    />
                    </div>
                    {file && <p className="text-sm text-muted-foreground mt-2">Selected: {file.name}</p>}
                </div>
            </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleImport} disabled={loading || (activeTab === 'upload' && !file) || (activeTab === 'paste' && !pastedText.trim())}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : (
              "Sync Now"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
