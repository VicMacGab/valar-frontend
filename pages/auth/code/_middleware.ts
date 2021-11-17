import type { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(
  req: NextRequest,
  ev: NextFetchEvent,
  res: NextResponse
) {
  const cookies = req.cookies;
  console.log(JSON.stringify(cookies, null, 2));

  // TODO: no dejarlo pasar si no tenemos el cookie 'username'

  // una se usa para guardar el username de tal manera que al verificar el código de autenticacion, se revise el cookie
  // se obtenga el username del payload del JWT y se pueda comparar el authCode con el que tiene el hash

  const token = cookies["username"];

  if (token) {
    const buf = Buffer.from(token, "base64");

    const decodedJWT = buf.toString("ascii");

    console.log("Decoded JWT: ", decodedJWT);

    console.log("JWT SECRET: ", process.env.JWT_SECRET);

    // TODO: dejarlo pasar
  } else {
    // TODO: no mandó el cookie, ya expiró su authCode
    console.log("no mandó el cookie, expiró su authCode");
  }

  return res;
}
