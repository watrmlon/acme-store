import React from "react";
import { StoreName } from "@/components/others/store-name";
import { auth } from "@clerk/nextjs";
import prisma from "@/prisma";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
  params: {
    storeId: string;
  };
};

export default async function AdminLayout({ children, params }: Props) {
  const user = auth();

  if (!user.userId) {
    redirect(process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL as string);
  }

  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
      userId: user.userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="p-24 space-y-4">
      <header className="my-4">Admin Layout Navigation</header>
      <h1 className="typo-h1">Store ID: {params.storeId}</h1>
      <StoreName />
      {children}
    </div>
  );
}
