import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * ─── Middleware d'Authentification Admin ─────────────────────
 *
 * Gère les redirections automatiques :
 * 1. Si l'utilisateur tente d'accéder au dashboard sans être connecté,
 *    il est redirigé vers la page de login.
 * 2. Si l'utilisateur est déjà connecté et tente d'aller sur les pages
 *    d'auth (login/signup), il est redirigé vers le dashboard.
 *
 * Note : La présence du 'refreshToken' est utilisée comme indicateur
 * principal de session, car le 'accessToken' est courte durée.
 */

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // On vérifie la présence du token de rafraîchissement
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // Chemins à protéger (dashboard)
  const isDashboardPath = pathname.startsWith("/admin/dashboard");

  // Chemins d'authentification (login, signup)
  const isAuthPath = pathname.startsWith("/admin/auth");
  const is2FAPath = pathname.includes("verify-2fa");

  // CAS 1 : Accès dashboard sans session -> Login
  if (isDashboardPath && !refreshToken) {
    return NextResponse.redirect(new URL("/admin/auth/login", request.url));
  }

  
  // CAS 2 : Accès auth avec session -> Dashboard
  // Sauf pour la page de vérification 2FA qui doit rester accessible
  if (isAuthPath && refreshToken && !is2FAPath) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

// Configuration du matcher pour limiter le middleware aux routes admin
export const config = {
  matcher: ["/admin/:path*"],
};
