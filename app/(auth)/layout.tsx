import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <main className="flex flex-col items-center justify-center h-full bg-background">
      {children}
    </main>
  );
}
