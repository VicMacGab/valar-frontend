import type { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(
  req: NextRequest,
  ev: NextFetchEvent,
  res: NextResponse
) {
  const cookies = req.cookies;
  console.log(JSON.stringify(cookies, null, 2));

  // TODO: hay dos cookies

  // una se usa para guardar el username de tal manera que al verificar el código de autenticacion, se revise el cookie
  // se obtenga el username del payload del JWT y se pueda comparar el authCode con el que tiene el hash

  // otra se usa para mantener logueado al usuario, si el cookie expira (o se borra), entonces el usuario no debe
  // tener acceso a las rutas

  // TODO: rechazar acceso si no esta el cookie de login

  const token = cookies["username"];

  if (token) {
    const buf = Buffer.from(token, "base64");

    const decodedJWT = buf.toString("ascii");

    console.log("Decoded JWT: ", decodedJWT);

    console.log("JWT SECRET: ", process.env.JWT_SECRET);
  } else {
    // TODO: no mandó el cookie, esta deslogueado, no dejarlo pasar
    console.log("no mandó el cookie, está deslogueado");
  }

  return res;
}
