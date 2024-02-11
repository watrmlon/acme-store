import React from "react";
import { auth } from "@clerk/nextjs";
import prisma from "@/prisma";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default async function MarketingLayout({ children }: Props) {
  const user = auth();

  if (!user.userId) {
    redirect(process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL as string);
  }

  // TODO NextJS does not pick up the userId before prisma is called 
  // TODO run prisma migrate and then 
  // TODO prisma db push
  
  // FIXME Ensure that the userid is being read before the prisma store is called.
  const store = await prisma.store.findFirst({
    where: {
      userId: user.userId,
    },
  });

  if (store) {
    redirect(`/${store.id}?name=${store.name}`);
  }
  return <React.Fragment>{children}</React.Fragment>;
}
