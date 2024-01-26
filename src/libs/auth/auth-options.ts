import type { NextAuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";

import { providers } from "@/libs/auth/providers/auth-providers";
import prisma from "@/libs/prisma";
import { getUserByEmail } from "@/repositories/user-repository";
import { CustomPrismaAdapter } from "./custom-prisma-adapter";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: CustomPrismaAdapter(prisma) as Adapter,
  providers,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session }) {
      if (!session.user.email) {
        throw new Error("Missing email");
      }

      const userData = await getUserByEmail(session.user.email);

      if (session.user && userData) {
        session.user.role = userData.role;
        session.user.isActive = userData.isActive;
      }

      return session;
    },
  },
  debug: false,
};
