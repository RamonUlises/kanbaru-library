export const prerender = false;
import { getPool } from "@lib/database";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  try{
    const pool = await getPool();
    const response = await pool.query`SELECT c.categoria, COUNT(l.id_libros) AS cantidad FROM libros l INNER JOIN categorias c ON l.id_categoria = c.id_categoria GROUP BY c.categoria ORDER BY cantidad DESC`;

    return new Response(JSON.stringify(response.recordset), { status: 200 });
  } catch {
    console.log("Error al obtener la cantidad de libros por categoría");
    return new Response(JSON.stringify([]), { status: 500 });
  }
}