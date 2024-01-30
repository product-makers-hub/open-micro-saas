/* eslint-disable no-unused-vars */

// Docs: https://next-auth.js.org/getting-started/typescript
import NextAuth, { DefaultSession } from "next-auth";

interface Role {
  name: string;
  id: number | undefined;
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      publicId: string;
      role: Role;
      isActive: boolean;
      stripeCustomerId: string | null;
    } & DefaultSession["user"];
  }
}
