import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get("refreshToken");

  const isSignupPath = pathname === "/admin/auth/signup";
  const isSetup2FAPath = pathname === "/admin/auth/setup-2fa";
  const isVerify2FAPath = pathname === "/admin/auth/verify-2fa";
  const isLoginPath = pathname === "/admin/auth/login";
  const isDashboardPath = pathname.startsWith("/admin/dashboard");
  const isAuthPath = pathname.startsWith("/admin/auth");

  if (!refreshToken) {
    if (
      pathname === "/admin" ||
      isDashboardPath ||
      isSignupPath ||
      isSetup2FAPath
    ) {
      return NextResponse.redirect(new URL("/admin/auth/login", request.url));
    }
  } else {
    if (isAuthPath && !isSignupPath && !isSetup2FAPath) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
