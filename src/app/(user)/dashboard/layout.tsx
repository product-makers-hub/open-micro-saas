import React from "react";
import { redirect } from "next/navigation";

import { authConfig } from "@/config/auth-config";
import { getIsAuth, getIsAdmin } from "@/libs/auth/auth-utils";

export default async function DashboardLayout({
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

  return <>{children}</>;
}
