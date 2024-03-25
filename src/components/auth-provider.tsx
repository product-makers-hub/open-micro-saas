import { SessionProvider } from "next-auth/react";

import { getSession } from "@/libs/auth/auth-utils";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = async ({ children }: AuthProviderProps) => {
  const session = await getSession();
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
