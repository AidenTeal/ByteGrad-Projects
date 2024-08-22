import NextAuth from "next-auth";
import { auth } from "./lib/auth-no-edge";
import { nextAuthEdgeConfig } from "./lib/auth-edge";

export default NextAuth(nextAuthEdgeConfig).auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
