"use client"

import React from "react";
import { useModalStore } from "@/hooks/use-modal-store";

export default function Home() {
  const onOpen = useModalStore((state) => state.onOpen);
  const isOpen = useModalStore((state) => state.isOpen);

  React.useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);
  
  return null;
}
