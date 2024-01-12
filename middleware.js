import { NextResponse } from "next/server"
import { getSession } from "next-auth/react"

async function middleware(request) {
  const requestForNextAuth = {
    headers: {
      cookie: request.headers.get("cookie"),
    },
  };

  const session = await getSession({ req: requestForNextAuth });

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/signup");

  const url_login = request.nextUrl.clone();
  url_login.pathname = "/login";

  const url_dashboard = request.nextUrl.clone();
  url_dashboard.pathname = "/dashboard";

  if (!session) {
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
  matcher: ["/dashboard/:path*", "/api/:path*"]
};