import type { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(
  req: NextRequest,
  ev: NextFetchEvent,
  res: NextResponse
) {
  const cookies = req.cookies;
  console.log(JSON.stringify(cookies, null, 2));

  // TODO: no dejarlo pasar si tenemos el cookie de login ''

  // una se usa para guardar el username de tal manera que al verificar el código de autenticacion, se revise el cookie
  // se obtenga el username del payload del JWT y se pueda comparar el authCode con el que tiene el hash

  const token = cookies["valarSession"];

  return res;
}
