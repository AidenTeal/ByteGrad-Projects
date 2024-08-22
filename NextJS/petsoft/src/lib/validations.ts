import { z } from "zod";
import { DEFAULT_PET_IMAGE } from "./constants";
import email from "next-auth/providers/email";

export const petSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: "Name is required" })
      .max(15, { message: "Name is too long" }),
    ownerName: z
      .string()
      .trim()
      .min(1, { message: "Owner name is required" })
      .max(50, { message: "Owner name is too long" }),
    age: z.coerce
      .number()
      .int()
      .min(0, { message: "Age must be a positive number" }),
    imageUrl: z.union([
      z.literal(""),
      z.string().trim().url({ message: "Invalid URL" }),
    ]),
    notes: z.union([
      z.literal(""),
      z.string().trim().max(1000, { message: "Notes are too long" }),
    ]),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || DEFAULT_PET_IMAGE,
  }));

export type TPetForm = z.infer<typeof petSchema>;


export const petIDSchema = z.string().cuid().min(1, { message: "Invalid pet ID" });
export type TPetID = z.infer<typeof petIDSchema>;

export const authSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().max(100)
})

export type TAuth = z.infer<typeof authSchema>;