import type { APIRoute } from "astro";
import { getPool } from "@lib/database";
import { encrypt } from "@lib/encripts";

export const POST: APIRoute = async ({ request }) => {

  const { nombre, correo, contrasenia, fecha_nacimiento, id_sexo } =
    await request.json();

  if (!nombre || !correo || !contrasenia || !fecha_nacimiento || !id_sexo) {
    return new Response(
      JSON.stringify({ message: "Las credenciales son obligatorias" }),
      { status: 400 }
    );
  }

  try {
    const contra = await encrypt(contrasenia);
    const pool = await getPool(); // ← aseguramos la conexión activa

    await pool
      .request()
      .input("nombre", nombre)
      .input("correo", correo)
      .input("contrasenia", contra)
      .input("fecha_nacimiento", fecha_nacimiento)
      .input("id_sexo", id_sexo)
      .execute("sp_crear_usuario");

    return new Response(
      JSON.stringify({ message: "Usuario registrado correctamente" }),
      { status: 200 }
    );
  } catch (err: any) {
    console.error(err);
    if (err.number === 50001) {
      return new Response(
        JSON.stringify({ message: "El correo ya está registrado" }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Error al registrar el usuario" }),
      { status: 500 }
    );
  }
};
