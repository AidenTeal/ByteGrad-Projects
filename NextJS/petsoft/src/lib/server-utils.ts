import "server-only";

import { redirect } from "next/navigation";
import { auth } from "./auth";
import { Pet, User } from "@prisma/client";
import prisma from "./db";
import { TPet } from "./types";

export async function checkAuth() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  } else {
    return session;
  }
}

export async function getPetByID(petID: Pet["id"]) {
  try {
    const pet = await prisma.pet.findUnique({
      where: {
        id: petID,
      },
    });

    return pet;
  } catch (error) {
    return undefined;
  }
}

export async function getPetsByUserID(userId: User["id"]) {
  try {
    const pets: TPet[] = await prisma.pet.findMany({
      where: {
        userId: userId,
      },
    });

    return pets;
  } catch (error) {
    return [];
  }
}

export async function getUserByEmail(email: User["email"]) {
  try {
    // check for email in db
    const user = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
    });

    return user;
  } catch (error) {
    return undefined;
  }
}
