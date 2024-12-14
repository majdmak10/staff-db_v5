import { NextRequest, NextResponse } from "next/server";
import { verifyToken, ROLE_PERMISSIONS } from "@/lib/session";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const admin = verifyToken(token);

  // Determine which paths require specific permissions
  const path = req.nextUrl.pathname;

  if (!admin || !["Super-Admin", "Admin", "Guest"].includes(admin.role)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Additional path-based access control
  if (
    path.startsWith("/dashboard/admins") &&
    !admin.permissions.canAccessAllDashboards
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
