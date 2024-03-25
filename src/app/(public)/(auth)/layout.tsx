import React from "react";
import { redirect } from "next/navigation";

import { getSession } from "@/libs/auth/auth-utils";
import { authConfig } from "@/config/auth-config";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session) {
    redirect(authConfig.normalUserCallbackUrl);
  }

  return <>{children}</>;
}
