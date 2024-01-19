"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

import { useAuth } from "@/hooks/use-auth";
import { UserDropdown } from "./user-dropdown";

export const Navbar = () => {
  const { status, user } = useAuth();

  return (
    <nav className="navbar bg-base-300">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost text-xl">
          Open SaaS
        </Link>
      </div>
      <div className="flex-none">
        <div>
          {status === "unauthenticated" && (
            <Link href="/auth/login" className="btn">
              Login
            </Link>
          )}
          {status === "authenticated" && (
            <UserDropdown user={user} onSignOut={() => signOut()} />
          )}
        </div>
      </div>
    </nav>
  );
};
