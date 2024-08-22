"use server";

import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { checkAuth, getPetByID } from "@/lib/server-utils";
import { authSchema, petIDSchema, petSchema, TAuth } from "@/lib/validations";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// --- Pet actions ---

export const addPet = async (petData: unknown) => {
  const validatedPetData = petSchema.safeParse(petData);
  if (!validatedPetData.success) {
    return {
      message: "Invalid pet data",
    };
  }

  // Authentication check
  const session = await checkAuth();

  const petToAdd = {
    ...validatedPetData.data,
  };

  try {
    await prisma.pet.create({
      data: {
        ...petToAdd,
        user: {
          connect: {
            id: session.user?.id,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    return {
      message: "Could not add the pet",
    };
  }

  revalidatePath("/(app)/app", "layout");
};

export const editPet = async (petID: unknown, petData: unknown) => {
  const validatedPetData = petSchema.safeParse(petData);
  const validatedPetID = petIDSchema.safeParse(petID);

  // Data check
  if (!validatedPetData.success || !validatedPetID.success) {
    return {
      message: "Invalid pet data",
    };
  }

  const petToAdd = {
    ...validatedPetData.data,
    id: validatedPetID.data,
  };

  // Authentication check
  const session = await checkAuth();

  // Authorization check
  const pet = await getPetByID(validatedPetID.data);

  if (!pet) {
    return {
      message: "Pet not found",
    };
  }

  if (pet.userId !== session.user.id) {
    return {
      message: "You are not authorized to edit this pet",
    };
  }

  // User is authorized to edit pet
  try {
    await prisma.pet.update({
      where: {
        id: validatedPetID.data,
      },
      data: petToAdd,
    });
  } catch (error) {
    return {
      message: "Could not edit the pet",
    };
  }

  revalidatePath("/(app)/app", "layout");
};

export const checkoutPet = async (petID: unknown) => {
  // Data check
  const validatedPetID = petIDSchema.safeParse(petID);
  if (!validatedPetID.success) {
    return {
      message: "Invalid pet ID",
    };
  }

  // Authentication check
  const session = await checkAuth();

  // Authorization check
  const pet = await getPetByID(validatedPetID.data);

  if (!pet) {
    return {
      message: "Pet not found",
    };
  }

  if (pet.userId !== session.user.id) {
    return {
      message: "You are not authorized to checkout this pet",
    };
  }

  // User is authorized to checkout pet
  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetID.data,
      },
    });
  } catch (error) {
    return {
      message: "Could not delete the pet",
    };
  }

  revalidatePath("/(app)/app", "layout");
};

// --- User actions ---

export const loginUser = async (prevState: unknown, formData: unknown) => {
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid Form Data",
    };
  }
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': {
          return {
            message: "Invalid credentials",
          }
        }
        default: {
          return {
            message: "Could not sign the user in",
          }
        }
      }
    }

    throw error; // nexths redirect throws an error, so we need to rethrow it
  }
  
};

export const logoutUser = async () => {
  await signOut({ redirectTo: "/" });
};

export const signUpUser = async (prevState: unknown, formData: unknown) => {
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid Form Data",
    };
  }
  const formDataEntries = Object.fromEntries(formData.entries());

  const validatedFormData = authSchema.safeParse(formDataEntries);
  if (!validatedFormData.success) {
    return {
      message: "Invalid form data",
    };
  }

  // get hashed password
  const hashedPassword = await bcrypt.hash(validatedFormData.data.password, 10);

  try {
    await prisma.user.create({
      data: {
        email: validatedFormData.data.email,
        hashedPassword: hashedPassword
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          message: "Email already in use",
        };
      }
    }
    return {
      message: "Could not sign the user up",
    };
  }

  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': {
          return {
            message: "Invalid credentials",
          }
        }
        default: {
          return {
            message: "Could not sign the user in",
          }
        }
      }
    }

    throw error; // nexths redirect throws an error, so we need to rethrow it
  }
};


// --- Payment Actions ---

export const createCheckoutSession = async () => {
  // authentication check
  const session = await checkAuth();

  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email,
    line_items: [
      {
        price: "price_1PqKQYESPyEjnDjdlY6PZyQD",
        quantity: 1
      }
    ],
    mode: "payment",
    success_url: `${process.env.CANONICAL_URL}/payment?success=true`,
    cancel_url: `${process.env.CANONICAL_URL}/payment?cancelled=true`
  })


  // redirect user
  redirect(checkoutSession.url);
}