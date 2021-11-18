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
  if (req.page.name == "/") {
    if (req.cookies["valarSession"]) {
      // el siguiente middleware ya se encargará de chequear la firma del cookie
      return NextResponse.redirect("/home");
    }
  }

  return res;
}
