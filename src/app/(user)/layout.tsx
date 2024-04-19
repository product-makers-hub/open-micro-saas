import { redirect } from "next/navigation";

import { authConfig } from "@/config/auth-config";
import { getIsAuth, getIsAdmin } from "@/libs/auth/auth-utils";
import { UserNavbar } from "./_components/user-navbar";

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
      <div className="px-6">
        <main className="">{children}</main>
      </div>
    </>
  );
}
