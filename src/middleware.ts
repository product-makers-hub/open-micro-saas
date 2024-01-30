import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("middleware", request.nextUrl.pathname);
}
