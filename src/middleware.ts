import { NextRequest, NextResponse } from "next/server";

const redirects: Record<string, string> = {
  "/about.html": "/about",
  "/contact.html": "/contact",
  "/privacy.html": "/privacy",
  "/terms.html": "/terms",
  "/source-policy.html": "/source-policy"
};

export function middleware(request: NextRequest) {
  const target = redirects[request.nextUrl.pathname];
  if (!target) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = target;
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: ["/about.html", "/contact.html", "/privacy.html", "/terms.html", "/source-policy.html"]
};
