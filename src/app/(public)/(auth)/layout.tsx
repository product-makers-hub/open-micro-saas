import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/libs/auth/auth-options";
import { authConfig } from "@/config/auth-config";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect(authConfig.normalUserCallbackUrl);
  }

  return <>{children}</>;
}
