export const prerender = false;
import { getPool } from "@lib/database";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  try {
    const pool = await getPool();
    const result = await pool.query(`
      SELECT s.sexo, COUNT(*) AS cantidad
      FROM usuarios u
      JOIN sexos s ON u.id_sexo = s.id_sexo
      GROUP BY s.sexo
    `);

    return new Response(
      JSON.stringify({
        labels: result.recordset.map((row) => row.sexo),
        data: result.recordset.map((row) => row.cantidad),
      }),
      { status: 200 },
    );
  } catch {
    return new Response(JSON.stringify([]), { status: 500 });
  }
};