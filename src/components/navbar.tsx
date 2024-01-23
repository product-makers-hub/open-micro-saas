"use client";

import Link from "next/link";

import { useAuth } from "@/hooks/use-auth";
import { UserDropdown } from "./user-dropdown";
import { ThemeToggle } from "./theme-toggle";

export const Navbar = () => {
  const { status } = useAuth();

  return (
    <nav className="navbar bg-base-300">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          Open SaaS
        </Link>
      </div>
      <div className="flex-none">
        <div className="px-2">
          <ThemeToggle />
        </div>
        <div>
          {status === "loading" && (
            <span className="loading loading-spinner loading-sm" />
          )}
          {status === "unauthenticated" && (
            <Link href="/auth/login" className="btn">
              Login
            </Link>
          )}
          {status === "authenticated" && <UserDropdown />}
        </div>
      </div>
    </nav>
  );
};
