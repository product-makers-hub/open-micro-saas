import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Toaster } from "react-hot-toast";

import { authOptions } from "@/libs/auth/auth-options";
import { authConfig } from "@/config";
import { ADMIN_ROLE_NAME } from "@/consts/roles-consts";
import { Drawer } from "@/components/drawer";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role.name !== ADMIN_ROLE_NAME) {
    redirect(authConfig.loginUrl);
  }

  return (
    <>
      <Toaster position="bottom-right" />
      <Drawer>{children}</Drawer>
    </>
  );
}
