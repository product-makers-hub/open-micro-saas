"use client";

import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { siteMetadata } from "@/config/site-metadata-config";
import { authConfig } from "@/config/auth-config";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { useAuth } from "@/hooks/use-auth";
import { UserDropdown } from "@/components/user-dropdown";
import { authenticatedUserNavLinks } from "@/config/navigation-links-config";
import { MobileNav } from "@/components/mobile-nav";

export const UserNavbar = () => {
  const { status } = useAuth();

  return (
    <NavigationMenu
      className="flex h-[80px] items-center justify-between flex-wrap w-full p-6 border-b-2"
      aria-label="main navbar"
    >
      <MobileNav links={authenticatedUserNavLinks} />
      <div className="hidden lg:flex items-center flex-shrink-0 mr-6">
        <Link
          href={authConfig.normalUserCallbackUrl}
          className="btn btn-ghost text-xl"
        >
          {siteMetadata.title}
        </Link>
      </div>
      <div className="flex items-center">
        <div className="lg:px-2">
          <ThemeToggle />
        </div>
        {status === "loading" && (
          <span className="loading loading-spinner loading-sm" />
        )}
        {status === "authenticated" && <UserDropdown />}
      </div>
    </NavigationMenu>
  );
};
