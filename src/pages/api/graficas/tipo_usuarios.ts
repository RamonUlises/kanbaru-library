export const prerender = false;
import { getPool } from "@lib/database";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  try {
    const pool = await getPool();
    const result = await pool.query(`
      SELECT t.tipo_usuario, COUNT(*) AS cantidad
      FROM usuarios u
      JOIN tipos_usuarios t ON u.id_tipo_usuario = t.id_tipo_usuario
      GROUP BY t.tipo_usuario
    `);

    return new Response(
      JSON.stringify({
        labels: result.recordset.map((row) => row.tipo_usuario),
        data: result.recordset.map((row) => row.cantidad),
      }),
      { status: 200 },
    );
  } catch {
    return new Response(JSON.stringify([]), { status: 500 });
  }
};