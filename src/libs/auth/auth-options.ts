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
    strategy: "database",
  },
  debug: process.env.NODE_ENV === "development",
};
