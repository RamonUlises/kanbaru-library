export const prerender = false;
import { getPool } from "@lib/database";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  try {
    const pool = await getPool();
    const result = await pool.query(`
      SELECT l.titulo, COUNT(*) AS cantidad
      FROM prestamos p
      JOIN libros l ON p.id_libros = l.id_libros
      GROUP BY l.titulo
      ORDER BY cantidad DESC
      OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY
    `);

    return new Response(
      JSON.stringify({
        labels: result.recordset.map((row) => row.titulo),
        data: result.recordset.map((row) => row.cantidad),
      }),
      { status: 200 },
    );
  } catch {
    return new Response(JSON.stringify([]), { status: 500 });
  }
};