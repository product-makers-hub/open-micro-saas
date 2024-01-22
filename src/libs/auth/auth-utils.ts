import { getServerSession } from "next-auth";

import { authOptions } from "@/libs/auth/auth-options";
import { ADMIN_ROLE_NAME } from "@/consts/roles-consts";

export const getIsAuth = async () => {
  const session = await getServerSession(authOptions);

  return !!session;
};

export const getIsAdmin = async () => {
  const session = await getServerSession(authOptions);

  return session?.user?.role?.name === ADMIN_ROLE_NAME;
};
