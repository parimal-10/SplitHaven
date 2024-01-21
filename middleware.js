import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

async function middleware(request) {
  const token = await getToken({req: request});
  const isAuthenticated = !!token;

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/signup");

  const url_login = request.nextUrl.clone();
  url_login.pathname = "/login";

  const url_dashboard = request.nextUrl.clone();
  url_dashboard.pathname = "/dashboard";

  if (!isAuthenticated) {
    let from = request.nextUrl.pathname;
    if (request.nextUrl.search) {
      from += request.nextUrl.search;
    }
    return NextResponse.redirect(url_login);
  } else if (isAuthPage) {
    return NextResponse.redirect(url_dashboard);
  }
  return null;
}

export default middleware;

export const config = {
  matcher: ["/dashboard/:path*"]
};