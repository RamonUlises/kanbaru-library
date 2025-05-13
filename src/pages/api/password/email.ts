export const prerender = false;

import { getPool } from "@lib/database";
import { sendEmailRecover } from "@utils/sendEmailRecover";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") !== "application/json") {
    return new Response(
      JSON.stringify({ message: "El contenido del body debe ser JSON" }),
      { status: 400 },
    );
  }

  const { correo } = await request.json();

  if (!correo) {
    return new Response(
      JSON.stringify({ message: "El correo electrónico es obligatorio" }),
      { status: 400 },
    );
  }

  try {
    const pool = await getPool();
    const user =
      await pool.query`SELECT id_usuario, correo FROM usuarios WHERE correo = ${correo}`;

    if (user.recordset.length === 0) {
      return new Response(
        JSON.stringify({ message: "El correo electrónico no está registrado" }),
        { status: 400 },
      );
    }
  } catch {
    return new Response(
      JSON.stringify({ message: "Error al enviar el correo electrónico" }),
      { status: 400 },
    );
  }

  const token = Math.floor(100000 + Math.random() * 900000).toString();

  const response = await sendEmailRecover(correo, token);

  if (!response) {
    return new Response(
      JSON.stringify({ message: "Error al enviar el correo electrónico" }),
      { status: 400 },
    );
  }

  return new Response(
    JSON.stringify({ message: "Correo electrónico enviado correctamente", token }),
    { status: 200 },
  );
};
