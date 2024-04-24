import { redirect } from "next/navigation";

import { authConfig } from "@/config/auth-config";
import { getIsAuth, getIsAdmin } from "@/libs/auth/auth-utils";
import { UserNavbar } from "./_components/user-navbar";
import { UserSidenav } from "./_components/user-sidenav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = await getIsAuth();

  if (!isAuth) {
    redirect(authConfig.loginUrl);
  }

  const isAdmin = await getIsAdmin();

  if (isAdmin) {
    redirect(authConfig.adminUserCallbackUrl);
  }

  return (
    <>
      <UserNavbar />
      <main className="lg:flex lg:h-[calc(100vh-80px)]">
        <UserSidenav />
        <section className="flex-1 px-6 pt-4 overflow-auto">{children}</section>
      </main>
    </>
  );
}
