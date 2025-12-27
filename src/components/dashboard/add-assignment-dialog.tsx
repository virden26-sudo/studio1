
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

type AddAssignmentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AddAssignmentDialog({ open, onOpenChange }: AddAssignmentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Assignment</DialogTitle>
          <DialogDescription>
            Manually add an assignment to your agenda.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">{/* Form fields will go here */}</div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button>Add Assignment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
