"use client";

import Link from "next/link";

import { ThemeToggle } from "../theme-toggle";
import { siteMetadata } from "@/config/site-metadata-config";
import { publicNavLinks } from "@/config/navigation-links-config";
import { authConfig } from "@/config/auth-config";

export const PublicNavbar = () => {
  return (
    <nav className="navbar bg-base-200" aria-label="main navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {publicNavLinks.map((link) => (
              <li key={link.url}>
                <Link href={link.url}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          {siteMetadata.title}
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {publicNavLinks.map((link) => (
            <li key={link.url}>
              <Link href={link.url}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <div className="lg:px-2">
          <ThemeToggle />
        </div>
        <Link href={authConfig.loginUrl} className="btn">
          Login
        </Link>
      </div>
    </nav>
  );
};
