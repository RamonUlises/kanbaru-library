export const prerender = false;
import { getPool } from "@lib/database";
import { encrypt } from "@lib/encripts";
import type { APIRoute } from "astro";

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
      JSON.stringify({ message: "El correo electrónico y la contraseña son obligatorios" }),
      { status: 400 },
    );
  }

  const password = encrypt(contrasenia);

  try {
    const pool = await getPool();
    const response =
      await pool.query`UPDATE usuarios SET contrasenia = ${password} WHERE correo = ${correo}`;

    if (response.rowsAffected[0] === 0) {
      return new Response(
        JSON.stringify({ message: "Error al actualizar la contraseña" }),
        { status: 400 },
      );
    }
  } catch {
    return new Response(
      JSON.stringify({ message: "Error al actualizar la contraseña" }),
      { status: 400 },
    );
  }
      
  return new Response(
    JSON.stringify({ message: "Contraseña actualizada correctamente" }),
    { status: 200 },
  );
};