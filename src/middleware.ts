import type { NextMiddleware } from "next/server";
import { NextRequest, NextResponse } from "next/server";

export const middleware: NextMiddleware = (req: NextRequest) => {
  if (req.nextUrl.pathname === "/" && req.method === "GET") {
    const url = req.nextUrl.clone();
    url.pathname = "/minutes";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
};
