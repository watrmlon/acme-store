"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import React from "react";

type ModalProps = {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({
  title,
  description,
  isOpen,
  children,
  onClose,
}: ModalProps) {
  function onChange(open: boolean): void {
    if (!open) {
      onClose();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <React.Fragment>{children}</React.Fragment>
        <DialogFooter className="pt-4 border-t border-border">
          <p className="typo-muted">
            &copy; 2024 PeakBuy
            <span className="font-bold">Admin</span>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
