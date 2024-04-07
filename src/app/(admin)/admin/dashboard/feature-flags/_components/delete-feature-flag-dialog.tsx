"use client";

import { toast } from "sonner";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { deleteFeatureFlagAction } from "../actions";

interface DeleteFeatureFlagDialogProps {
  name: string;
}

export const DeleteFeatureFlagDialog = ({
  name,
}: DeleteFeatureFlagDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteFeatureFlag = async () => {
    const result = await deleteFeatureFlagAction(name);
    if (result.success) {
      toast.success("Feature flag deleted successfully");
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete feature flag</DialogTitle>
          <DialogDescription>
            Before deleting it, check that this feature flag is not being used
            by any part of the code.
          </DialogDescription>
          <Typography>Are you sure you want to delete {name}?</Typography>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>

          <Button variant="destructive" onClick={handleDeleteFeatureFlag}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
