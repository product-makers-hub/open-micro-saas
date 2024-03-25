import { getServerSession } from "next-auth";

import { authOptions } from "@/libs/auth/auth-options";
import { UserRole } from "@prisma/client";

export const getIsAuth = async () => {
  const session = await getServerSession(authOptions);

  return !!session;
};

export const getIsAdmin = async () => {
  const session = await getServerSession(authOptions);

  return session?.user?.role === UserRole.ADMIN;
};
