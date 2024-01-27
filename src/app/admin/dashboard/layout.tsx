import React from "react";
import { Toaster } from "react-hot-toast";

import { Drawer } from "@/components/drawer";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster position="bottom-right" />
      <Drawer>{children}</Drawer>
    </>
  );
}
