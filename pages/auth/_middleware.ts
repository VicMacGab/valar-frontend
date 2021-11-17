import cookieParser from "cookie-parser";
import type {
  NextFetchEvent,
  NextRequest as NextRequestType,
  NextResponse as NextResponseType,
} from "next/server";
import { NextResponse } from "next/server";

export function middleware(
  req: NextRequestType,
  ev: NextFetchEvent,
  res: NextResponseType
) {
  const cookies = req.cookies;
  const valarSession = cookies["valarSession"];

  if (!valarSession) {
    return res;
  }

  const unsignedCookie = cookieParser.signedCookie(
    valarSession,
    process.env.COOKIES_SECRET!
  );

  console.log("unsigned valarSession: ", unsignedCookie);

  // cookie has been tampered
  if (unsignedCookie === false || unsignedCookie === valarSession) {
    return NextResponse.redirect("/").clearCookie("valarSession");
  } else {
    return NextResponse.redirect("/home");
  }
}
