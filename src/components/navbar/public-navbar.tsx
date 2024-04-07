"use client";

import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
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
import { MobileNav } from "@/components/mobile-nav";

export const PublicNavbar = () => {
  return (
    <NavigationMenu
      className="flex h-[80px] items-center justify-between flex-wrap w-full p-6"
      aria-label="main navbar"
    >
      <MobileNav links={publicNavLinks} />
      <div className="hidden lg:flex items-center flex-shrink-0 mr-6">
        <Link href="/" className="btn btn-ghost text-xl">
          {siteMetadata.title}
        </Link>
      </div>
      <NavigationMenuList className="hidden lg:flex flex-grow lg:items-center lg:w-auto">
        {publicNavLinks.map((link) => (
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
        <Button asChild variant="outline">
          <Link href={authConfig.loginUrl}>Login</Link>
        </Button>
      </div>
    </NavigationMenu>
  );
};
