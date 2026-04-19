import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const DEV_PASSWORD = "OKLE";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Dev access gate: /passwordOKLE sets a cookie and redirects to /dashboard
  if (pathname.startsWith("/password")) {
    const token = pathname.slice("/password".length);
    if (token !== DEV_PASSWORD) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    const res = NextResponse.redirect(new URL("/login", request.url));
    res.cookies.set("_dev_access", DEV_PASSWORD, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });
    return res;
  }

  // Allow requests that carry the dev access cookie
  if (request.cookies.get("_dev_access")?.value === DEV_PASSWORD) {
    return NextResponse.next();
  }

  const jwtToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!jwtToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (jwtToken.error === "RefreshTokenError") {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", "SessionExpired");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/password(.*)",
    "/dashboard/:path*",
    "/documents/:path*",
    "/settings/:path*",
    "/guidance/:path*",
  ],
};
