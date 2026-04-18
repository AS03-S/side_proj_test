import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const password = process.env.DEV_PASSWORD;

  if (!password) {
    return NextResponse.json({ error: "DEV_PASSWORD not configured." }, { status: 503 });
  }

  if (token !== password) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const res = NextResponse.redirect(new URL("/dashboard", req.url));
  res.cookies.set("_dev_access", password, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
    sameSite: "lax",
  });
  return res;
}
