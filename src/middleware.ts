import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

import { authConfig } from "./config";
import { ADMIN_ROLE_NAME } from "./consts/roles-consts";

const adminRoutes = [
  "/admin",
  "/admin/dashboard",
  "/admin/dashboard/user-management",
];

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const isAdminRoute = adminRoutes.includes(req.nextUrl.pathname);

    const isUserAdmin =
      (req.nextauth.token?.role as any)?.name === ADMIN_ROLE_NAME;

    if (isAdminRoute && !isUserAdmin) {
      return NextResponse.redirect(
        new URL(authConfig.normalUserCallbackUrl, req.url),
      );
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return token?.isActive as any;
      },
    },
    pages: {
      signIn: authConfig.loginUrl,
    },
  },
);

/**
 * The config for the middleware, it needs to be static.
 * Therefore, it's not possible to use variables like adminRoutes array
 */
export const config = {
  matcher: [
    "/admin/",
    "/admin/dashboard",
    "/admin/dashboard/user-management",
    "/profile",
    "/dashboard",
  ],
};
