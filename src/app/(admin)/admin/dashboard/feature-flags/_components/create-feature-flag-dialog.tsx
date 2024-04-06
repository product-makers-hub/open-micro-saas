"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FeatureFlagForm } from "./feature-flag-form";

export const CreateFeatureFlagDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onSuccess = async () => {
    toast.success("Feature flag created successfully");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>New feature flag</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new feature flag</DialogTitle>
          <DialogDescription>
            Make sure you are creating a feature flag for the right purpose.
          </DialogDescription>
        </DialogHeader>
        <FeatureFlagForm onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  );
};
