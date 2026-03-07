import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get("refreshToken");

  const isAuthPath = pathname.startsWith("/admin/auth");
  const isDashboardPath = pathname.startsWith("/admin/dashboard");
  const isLoginPath = pathname === "/admin/auth/login";
  const isSignupPath = pathname === "/admin/auth/signup";
  const isVerify2FAPath = pathname === "/admin/auth/verify-2fa";
  const isSetup2FAPath = pathname === "/admin/auth/setup-2fa";

  if (!refreshToken) {
    if (pathname.startsWith("/admin") && !isLoginPath && !isVerify2FAPath) {
      return NextResponse.redirect(new URL("/admin/auth/login", request.url));
    }
  } else {
    if (isLoginPath || isVerify2FAPath) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
