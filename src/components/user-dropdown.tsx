"use client";

import NextImage from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

import { useAuth } from "@/hooks/use-auth";
import { ADMIN_ROLE_NAME } from "@/consts/roles-consts";
import { BillingButton } from "./billing-button";

export const UserDropdown = () => {
  const { user } = useAuth();

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="avatar btn btn-circle btn-ghost"
      >
        <div className="w-10 rounded-full">
          {user?.image && (
            <NextImage
              alt={user?.name || user?.email || "user"}
              src={user?.image}
              width={40}
              height={40}
            />
          )}
          {!user?.image && (
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
              <svg
                className="absolute -left-1 h-12 w-12 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>user profile avatar</title>
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      <ul
        tabIndex={0}
        role="menu"
        aria-labelledby="user menu"
        className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
      >
        {user?.role?.name === ADMIN_ROLE_NAME && (
          <li>
            <Link href="/admin/dashboard" className="justify-between">
              Admin Dashboard
            </Link>
          </li>
        )}
        <li>
          <Link href="/profile" className="justify-between">
            Profile
          </Link>
        </li>
        {user?.isActive && (
          <li>
            <BillingButton />
          </li>
        )}
        <li>
          <button onClick={() => signOut()}>Logout</button>
        </li>
      </ul>
    </div>
  );
};
