import type { APIRoute } from "astro";
import { getPool } from "@lib/database";

export const GET: APIRoute = async () => {
  try {
    const pool = await getPool();
    const resultado = await pool.query(`
      SELECT c.categoria, COUNT(l.id_libros) AS total
      FROM categorias c
      JOIN libros l ON l.id_categoria = c.id_categoria
      GROUP BY c.categoria
    `);

    return new Response(JSON.stringify(resultado.recordset), {
      status: 200,
    });
  } catch (err) {
    console.error("Error en API de categorías:", err);
    return new Response(
      JSON.stringify({ error: "Error al obtener datos de categorías" }),
      { status: 500 }
    );
  }
};