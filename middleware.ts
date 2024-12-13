import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/session";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const admin = verifyToken(token);
  if (!admin || !["Super-Admin", "Admin", "Guest"].includes(admin.role)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
