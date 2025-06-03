export const prerender = false;
import { getPool } from "@/lib/database";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = 15;
  const offset = (page - 1) * limit;

  try {
    const pool = await getPool();
    const result = await pool.query(`
      SELECT *
      FROM (
        SELECT 
          l.*, 
          c.categoria, 
          ROW_NUMBER() OVER (ORDER BY l.id_libros) AS row_num
        FROM libros l
        JOIN categorias c ON l.id_categoria = c.id_categoria
      ) AS sub
      WHERE sub.row_num > ${offset} AND sub.row_num <= ${offset + limit};
    `);

    return new Response(JSON.stringify(result.recordset), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Error al obtener libros" }), {
      status: 500,
    });
  }
};
