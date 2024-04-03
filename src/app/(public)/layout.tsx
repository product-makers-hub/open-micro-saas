import { redirect } from "next/navigation";

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
    <div>
      <main>{children}</main>
    </div>
  );
}
