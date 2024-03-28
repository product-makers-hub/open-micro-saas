import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

import { getSession } from "@/libs/auth/auth-utils";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const SessionProvider = async ({ children }: AuthProviderProps) => {
  const session = await getSession();
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
};
