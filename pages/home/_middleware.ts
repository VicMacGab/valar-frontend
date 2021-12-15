import type {
  NextFetchEvent,
  NextRequest as NextRequestType,
  NextResponse as NextResponseType,
} from "next/server";
import { NextResponse } from "next/server";
import cookieParser from "cookie-parser";

export function middleware(
  req: NextRequestType,
  ev: NextFetchEvent,
  res: NextResponseType
) {
  const cookies = req.cookies;
  const valarSession = cookies["valarSession"];

  if (!valarSession) {
    console.warn("no valarSession cookie present");
    return NextResponse.redirect("/");
  }

  const unsignedCookie = cookieParser.signedCookie(
    valarSession,
    process.env.COOKIES_SECRET!
  );

  // cookie has been tampered
  if (unsignedCookie === false || unsignedCookie === valarSession) {
    console.warn("valarSession cookie has been tampered");
    return NextResponse.redirect("/").clearCookie("valarSession");
  } else {
    return res;
  }
}
