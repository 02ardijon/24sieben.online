import { NextResponse } from "next/server";
import { auth } from "@/auth";

const protectedPrefixes = ["/portal", "/admin"];
const authOnlyRoutes = ["/login", "/register"];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth?.user;
  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));
  const isAdminRoute = pathname.startsWith("/admin");

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL("/login", req.nextUrl);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminRoute && isLoggedIn && req.auth?.user.role === "CUSTOMER") {
    return NextResponse.redirect(new URL("/portal", req.nextUrl));
  }

  if (authOnlyRoutes.includes(pathname) && isLoggedIn) {
    return NextResponse.redirect(new URL("/portal", req.nextUrl));
  }

  return NextResponse.next();
});

// Optimistic checks only — real authorization happens server-side in the DAL
// (src/lib/dal.ts) for every protected route, action and route handler.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.(?:png|svg|jpg|jpeg|ico)$).*)"],
};
