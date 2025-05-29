// src/pages/api/books/countsex.ts
export const prerender = false;
import { getPool } from "@lib/database";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  try {
    const pool = await getPool();
    const response = await pool.query`
      SELECT s.sexo, COUNT(u.id_usuario) AS cantidad
      FROM usuarios u
      INNER JOIN sexos s ON u.id_sexo = s.id_sexo
      GROUP BY s.sexo
      ORDER BY cantidad DESC
    `;
    return new Response(JSON.stringify(response.recordset), { status: 200 });
  } catch (error) {
    console.error("Error al obtener la cantidad de usuarios por sexo", error);
    return new Response(JSON.stringify([]), { status: 500 });
  }
}
