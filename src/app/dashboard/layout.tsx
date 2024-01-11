import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/libs/auth/auth-options";
import { authConfig } from "@/config";
import { ADMIN_ROLE_NAME } from "@/consts/roles-consts";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(authConfig.loginUrl);
  }

  if (session.user.role.name === ADMIN_ROLE_NAME) {
    redirect(authConfig.adminUserCallbackUrl);
  }

  return <>{children}</>;
}
