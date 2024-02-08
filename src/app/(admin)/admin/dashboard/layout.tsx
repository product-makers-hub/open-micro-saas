import React from "react";
import { redirect } from "next/navigation";

import { authConfig } from "@/config/auth-config";
import { getIsAdmin } from "@/libs/auth/auth-utils";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) {
    redirect(authConfig.loginUrl);
  }

  return <>{children}</>;
}
