import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prisma from "@/prisma";

export async function POST(req: Request) {
  try {
    const user = auth();
    const body = await req.json();
    const { name } = body;

    if (!user.userId) {
      return new NextResponse("Unauthorized user!", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const storeExists = await prisma.store.findUnique({
      where: {
        name: name,
        userId: user.userId,
      },
    });

    if (storeExists) {
      return new NextResponse("Store already exists", { status: 400 });
    }

    const store = await prisma.store.create({
      data: {
        name: name,
        userId: user.userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
