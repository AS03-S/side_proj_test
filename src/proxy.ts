import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Proxy (Next.js 16 name for middleware).
 * Protects all authenticated routes — redirects unauthenticated requests to /login.
 * Uses a lightweight JWT check (no DB round-trip) so it can run at the Edge.
 */
export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If the token refresh permanently failed, force re-login
  if (token.error === "RefreshTokenError") {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", "SessionExpired");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/documents/:path*",
    "/settings/:path*",
    "/guidance/:path*",
  ],
};
