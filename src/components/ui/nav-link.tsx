"use client";

import React from "react";

import { Link, LinkProps } from "@/components/ui/link";
import { usePathname } from "next/navigation";
import { cn } from "@/libs/utils";

export const NavLink = ({
  children,
  className,
  ...rest
}: { children: React.ReactNode } & LinkProps) => {
  const { href } = rest;
  const pathName = usePathname();

  const isActive = pathName === href;

  const activeClassName = isActive ? "bg-primary-foreground font-medium" : "";

  return (
    <Link {...rest} className={cn(className, activeClassName)}>
      {children}
    </Link>
  );
};
