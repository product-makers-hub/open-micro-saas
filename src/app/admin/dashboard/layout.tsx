import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/libs/auth/auth-options";
import { authConfig } from "@/config";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(authConfig.loginUrl);
  }

  return <>{children}</>;
}
