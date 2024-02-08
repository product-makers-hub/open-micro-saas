import { redirect } from "next/navigation";

import { PublicNavbar } from "@/components/navbar/public-navbar";
import { getIsAuth } from "@/libs/auth/auth-utils";
import { authConfig } from "@/config/auth-config";

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
    <div className="flex flex-col h-screen">
      <PublicNavbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
