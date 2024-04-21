import { redirect } from "next/navigation";

import { getIsAuth } from "@/libs/auth/auth-utils";
import { authConfig } from "@/config/auth-config";
import { PublicNavbar } from "@/components/navbar/public-navbar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = await getIsAuth();

  if (isAuth) {
    redirect(authConfig.normalUserCallbackUrl);
  }

  return (
    <div>
      <PublicNavbar />
      <main className="container">{children}</main>
    </div>
  );
}
