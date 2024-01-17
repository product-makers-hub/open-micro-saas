import type { NextAuthOptions } from "next-auth";
import type { Adapter } from "next-auth/adapters";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { providers } from "@/libs/auth/providers/auth-providers";
import prisma from "@/libs/prisma";

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

      const userData = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { role: true },
      });

      if (session.user && userData) {
        session.user.role = { ...userData.role, id: undefined };
        session.user.publicId = userData.publicId;
        session.user.isActive = userData.isActive;
      }

      return session;
    },
  },
  debug: false,
};
