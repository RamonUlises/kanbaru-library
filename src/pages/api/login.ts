export const prerender = false;

import sql from "@lib/database";
import { validatePassword } from "@lib/encripts";
import type { APIRoute } from "astro";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";

const AUTH_KEY = import.meta.env.AUTH_KEY;

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") !== "application/json") {
    return new Response(
      JSON.stringify({ message: "El contenido del body debe ser JSON" }),
      { status: 400 },
    );
  }

  const { correo, contrasenia } = await request.json();

  if (!correo || !contrasenia) {
    return new Response(
      JSON.stringify({ message: "Las credenciales son obligatorias" }),
      { status: 400 },
    );
  }

  const user =
    await sql.query`SELECT id_usuario, correo, contrasenia FROM usuarios WHERE correo = ${correo}`;

  if (user.recordset.length === 0) {
    return new Response(
      JSON.stringify({ message: "El correo electrónico no está registrado" }),
      { status: 400 },
    );
  }

  const verifid = await validatePassword(
    contrasenia,
    user.recordset[0].contrasenia,
  );

  if (!verifid) {
    return new Response(
      JSON.stringify({ message: "La contraseña no es correcta" }),
      { status: 400 },
    );
  }

  const userId = user.recordset[0].id_usuario;
  const token = jwt.sign({ userId }, AUTH_KEY, { expiresIn: "30d" });

  const cookie = serialize("token", token, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30,
  });

  return new Response(JSON.stringify({ message: "Credenciales válidas" }), {
    status: 200,
    headers: {
      "Set-Cookie": cookie,
    },
  });
};
