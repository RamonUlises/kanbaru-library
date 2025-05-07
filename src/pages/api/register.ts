export const prerender = false;

import type { APIRoute } from "astro";
import sql from "@lib/database";

export const POST: APIRoute = async ({ request }) => {
  if(request.headers.get("Content-Type") !== "application/json") {
    return new Response(JSON.stringify({ message: "El contenido del body debe ser JSON" }), { status: 400 });
  }

  const { nombre, correo, contrasenia, fecha_nacimiento, id_sexo } = await request.json();

  if (!nombre || !correo || !contrasenia || !fecha_nacimiento || !id_sexo) {
    return new Response(JSON.stringify({ message: "Las credenciales son obligatorias" }), { status: 400 });
  }

  sql.then(async (con) => {
    const response = await con.query`INSERT INTO usuarios(nombre, correo, contrasenia, fecha_nacimiento, id_sexo, id_tipo_usuario) VALUES(${nombre}, ${correo}, ${contrasenia}, ${fecha_nacimiento}, ${id_sexo}, 2)`;

    if(response.rowsAffected.length < 1) {
      return new Response(JSON.stringify({ message: "Error al registrar el usuario" }), { status: 500 });
    }
  })
  .catch(() => {
    return new Response(JSON.stringify({ message: "Error al registrar el usuario" }), { status: 500 });
  });

  return new Response(JSON.stringify({ message: "Credenciales válidas" }), { status: 200 });
};