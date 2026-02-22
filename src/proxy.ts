import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/utils";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verifica apenas se o cookie existe (não valida com a API)
  const sessionCookie = request.cookies.get(SESSION_COOKIE);
  const isAuthenticated = !!sessionCookie?.value;

  // Rotas autenticadas - /admin/*
  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Rotas de auth - /login, /signup, /forgot-password, /reset-password
  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password"
  ) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/signup"],
};
