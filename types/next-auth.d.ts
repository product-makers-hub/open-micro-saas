/* eslint-disable no-unused-vars */

// Docs: https://next-auth.js.org/getting-started/typescript
import NextAuth, { DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
  publicId: string;
  role: UserRole;
  isActive: boolean;
  stripeCustomerId: string | null;
};

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: ExtendedUser;
  }
}
