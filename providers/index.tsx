import { ModalProvider } from "./modal-provider";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <React.Fragment>
      {children}
      <ModalProvider />
    </React.Fragment>
  );
}
