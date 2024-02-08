import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import { Analytics } from "@/components/analytics/analytics";
import { Support } from "@/components/support/support";
import { siteMetadata } from "@/config/site-metadata-config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Analytics />
      <Support />
      <AuthProvider>
        <body className={inter.className}>
          <Toaster />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
