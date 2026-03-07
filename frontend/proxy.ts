import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get("refreshToken");

  const isSignupPage = pathname.startsWith("/admin/auth/signup");
  const isDashboardPage = pathname.startsWith("/admin/dashboard");
  const isOtherAuthPage = !isSignupPage && !isDashboardPage;
  const is2FAPath = pathname.includes("verify-2fa");

  if (isSignupPage && !refreshToken) {
    return NextResponse.redirect(new URL("/admin/auth/login", request.url));
  }

  if (isOtherAuthPage && refreshToken && !is2FAPath) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
