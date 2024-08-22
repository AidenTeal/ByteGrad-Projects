import NextAuth, { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./server-utils";
import { authSchema } from "./validations";
import { nextAuthEdgeConfig } from "./auth-edge";

const config = {
  ...nextAuthEdgeConfig,
  providers: [
    credentials({
      async authorize(credentials) {
        // runs on login

        // validation
        const validatedFormData = authSchema.safeParse(credentials);
        if (!validatedFormData.success) {
          return null;
        }

        // Runs on every login attempt
        const { email, password } = validatedFormData.data;

        const user = await getUserByEmail(email);

        // email not found
        if (!user) {
          console.log("No user found");
          return null;
        }

        // check for password match
        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        // Invalid Password
        if (!passwordMatch) {
          console.log("Invalid Credentials");
          return null;
        }

        return user;
      },
    }),
  ],
  session: {},
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
