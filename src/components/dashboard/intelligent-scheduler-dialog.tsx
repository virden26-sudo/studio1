
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type IntelligentSchedulerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function IntelligentSchedulerDialog({ open, onOpenChange }: IntelligentSchedulerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Intelligent Scheduler</DialogTitle>
          <DialogDescription>
            Let AI help you plan your study time.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">{/* Scheduler content goes here */}</div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
