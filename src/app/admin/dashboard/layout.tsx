import React from "react";
import { redirect } from "next/navigation";

import { authConfig } from "@/config";
import { Drawer } from "@/components/drawer";
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

  return <Drawer>{children}</Drawer>;
}
