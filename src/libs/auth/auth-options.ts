import type { NextAuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { providers } from "@/libs/auth/providers/auth-providers";
import prisma from "@/libs/prisma";
import { getUserByEmail } from "@/repositories/user-repository";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma) as Adapter,
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
        session.user.role = { ...userData.role, id: undefined };
        session.user.publicId = userData.publicId;
        session.user.isActive = userData.isActive;
      }

      return session;
    },
    async signIn({ user }) {
      if (!user?.email) {
        return false;
      }

      const userData = await getUserByEmail(user.email);

      if (!userData?.isActive) {
        throw new Error(
          "This user has been deactivated. Please contact support.",
        );
      }

      return true;
    },
  },
  debug: false,
};
