import type { Session } from "next-auth";

import { auth } from "@/libs/auth/auth-options";
import { UserRole } from "@prisma/client";

export const getIsAuth = async () => {
  const session = await auth();

  return !!session;
};

export const getSession = async (): Promise<Session | null> => {
  const session = await auth();
  return session;
};

export const getIsAdmin = async () => {
  const session = await auth();

  return session?.user?.role === UserRole.ADMIN;
};
