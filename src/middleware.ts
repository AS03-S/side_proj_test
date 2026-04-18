import { NextRequest, NextResponse } from "next/server";

// Change "OKLE" to whatever secret you want.
// Then visit yoursite.com/passwordOKLE (or whatever you set here).
const DEV_PASSWORD = "OKLE";
const PREFIX = "/password";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith(PREFIX)) return NextResponse.next();

  const token = pathname.slice(PREFIX.length);

  if (token !== DEV_PASSWORD) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const res = NextResponse.redirect(new URL("/dashboard", req.url));
  res.cookies.set("_dev_access", DEV_PASSWORD, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
    sameSite: "lax",
  });
  return res;
}

export const config = {
  matcher: ["/password(.*)"],
};
