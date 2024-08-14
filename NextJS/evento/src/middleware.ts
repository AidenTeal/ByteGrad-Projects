import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/events/all?page=1", request.url));
}

export const config = {
  matcher: ["/events"],
};
