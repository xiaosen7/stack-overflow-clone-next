"use server";

import { prisma } from "@/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function getCurrent() {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser.id,
    },
  });
  return user;
}

export const getCurrentOrThrow = async () => {
  const user = await getCurrent();

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export async function createIfNeeded() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return;
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      clerkId: clerkUser.id,
    },
  });
  if (existingUser) {
    return;
  }

  await prisma.user.create({
    data: {
      email: clerkUser.emailAddresses[0].emailAddress ?? "",
      fullName: clerkUser.fullName ?? "",
      clerkId: clerkUser.id,
      imageUrl: clerkUser.imageUrl,
      username: clerkUser.username ?? "",
    },
  });
}