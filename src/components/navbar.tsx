"use client";

import Link from "next/link";
import { UserRole } from "@prisma/client";

import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { siteMetadata } from "@/config/site-metadata-config";
import { publicNavLinks } from "@/config/navigation-links-config";
import { authConfig } from "@/config/auth-config";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/hooks/use-auth";
import { UserDropdown } from "@/components/user-dropdown";
import {
  adminNavLinks,
  authenticatedUserNavLinks,
} from "@/config/navigation-links-config";
import { MobileNav } from "./mobile-nav";

type Link = {
  title: string;
  url: string;
};

export const Navbar = () => {
  const { status, user } = useAuth();

  const isAdmin = status === "authenticated" && user?.role === UserRole.ADMIN;
  const isAuth = status === "authenticated";

  let navigationLinks: Link[] = [];
  let homeLink = authConfig.normalUserCallbackUrl;

  if (isAuth && !isAdmin) {
    navigationLinks = authenticatedUserNavLinks;
    homeLink = authConfig.normalUserCallbackUrl;
  } else if (isAuth && isAdmin) {
    navigationLinks = adminNavLinks;
    homeLink = authConfig.adminUserCallbackUrl;
  } else if (!isAuth) {
    navigationLinks = publicNavLinks;
    homeLink = "/";
  }

  return (
    <NavigationMenu
      className="flex h-[80px] items-center justify-between flex-wrap w-full p-6"
      aria-label="main navbar"
    >
      <MobileNav links={navigationLinks} />
      <div className="hidden lg:flex items-center flex-shrink-0 mr-6">
        <Link href={homeLink} className="btn btn-ghost text-xl">
          {siteMetadata.title}
        </Link>
      </div>
      <NavigationMenuList className="hidden lg:flex flex-grow lg:items-center lg:w-auto">
        {navigationLinks.map((link) => (
          <NavigationMenuItem key={link.url}>
            <Link href={link.url} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {link.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
      <div className="flex items-center">
        <div className="lg:px-2">
          <ThemeToggle />
        </div>
        {status === "loading" && (
          <span className="loading loading-spinner loading-sm" />
        )}

        {status === "unauthenticated" && (
          <Button asChild variant="outline">
            <Link href={authConfig.loginUrl}>Login</Link>
          </Button>
        )}

        {status === "authenticated" && <UserDropdown />}
      </div>
    </NavigationMenu>
  );
};
