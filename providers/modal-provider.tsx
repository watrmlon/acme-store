"use client";

import { CreateStoreModal } from "@/components/others/create-store-modal";
import { useMounted } from "@/hooks/use-mounted";

export function ModalProvider() {
  const { isMounted } = useMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateStoreModal />
    </>
  );
}
