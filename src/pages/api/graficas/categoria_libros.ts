export const prerender = false;
import { getPool } from "@lib/database";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  try {
    const pool = await getPool();
    const result = await pool.query(`
      SELECT c.categoria, COUNT(*) AS cantidad
      FROM libros l
      JOIN categorias c ON l.id_categoria = c.id_categoria
      GROUP BY c.categoria
    `);

    return new Response(
      JSON.stringify({
        labels: result.recordset.map((row) => row.categoria),
        data: result.recordset.map((row) => row.cantidad),
      }),
      { status: 200 },
    );
  } catch {
    return new Response(JSON.stringify([]), { status: 500 });
  }
};