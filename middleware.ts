import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/session";

const roleRedirects = {
  "Super-Admin": "/dashboard/admin",
  Admin: "/dashboard/admin",
  Guest: "/dashboard/guest",
};

function isValidRole(role: string): role is keyof typeof roleRedirects {
  return role in roleRedirects;
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const user = verifyToken(token);

  if (!user || !isValidRole(user.role)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL(roleRedirects[user.role], req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
